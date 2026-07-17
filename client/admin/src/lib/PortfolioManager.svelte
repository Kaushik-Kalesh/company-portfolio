<script>
  import { onMount } from 'svelte';
  import ProjectCard from './ProjectCard.svelte';
  import EditPanel from './EditPanel.svelte';

  let { ontoast } = $props();

  let projects = $state([]);
  let dataLoaded = $state(false);

  onMount(async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const res = await fetch(`${API_URL}/api/data/portfolio.json`);
      if (res.ok) {
        const data = await res.json();
        projects = data.map(p => ({ ...p, tags: [...(p.tags || [])] }));
      }
    } catch (e) {
      console.error(e);
      ontoast?.({ type: 'error', message: 'Failed to load portfolio from server' });
    }
    dataLoaded = true;
  });

  // Edit/Add panel state
  let editPanelOpen = $state(false);
  let editMode = $state('add'); // 'add' or 'edit'
  let editingProject = $state(null);
  let isSaving = $state(false);

  // Image selection state
  let bucketImages = $state([]);
  let showImageSelector = $state(false);

  async function fetchBucketImages() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const res = await fetch(`${API_URL}/api/images`);
      const data = await res.json();
      if (data.images) {
        bucketImages = data.images;
      }
    } catch (e) {
      console.error('Failed to fetch bucket images', e);
    }
  }

  let isUploadingImage = $state(false);

  async function uploadImage(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    isUploadingImage = true;
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    let successCount = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${API_URL}/api/upload-image`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          successCount++;
          let current = formImages.split(',').map(i=>i.trim()).filter(Boolean);
          if (!current.includes(data.filename)) current.push(data.filename);
          formImages = current.join(', ');
        }
      } catch (err) {
        console.error('Failed to upload image', err);
      }
    }
    
    if (successCount > 0) {
      ontoast?.({ type: 'success', message: `Successfully uploaded ${successCount} image(s)` });
      await fetchBucketImages();
    } else {
      ontoast?.({ type: 'error', message: 'Failed to upload images' });
    }
    
    isUploadingImage = false;
    event.target.value = null;
  }

  // Form fields
  let formName = $state('');
  let formClient = $state('');
  let formLogo = $state('');
  let formDescription = $state('');
  let formTags = $state('');
  let formImages = $state('');

  // Delete confirmation
  let showDeleteConfirm = $state(false);
  let deletingProject = $state(null);

  function resetForm() {
    formName = '';
    formClient = '';
    formLogo = '';
    formDescription = '';
    formTags = '';
    formImages = '';
  }

  function openAddPanel() {
    editMode = 'add';
    editingProject = null;
    resetForm();
    editPanelOpen = true;
  }

  function openEditPanel(project) {
    editMode = 'edit';
    editingProject = project;
    formName = project.name;
    formClient = project.client;
    formLogo = project.logo || '';
    formDescription = project.description;
    formTags = project.tags.join(', ');
    
    // Support legacy "image" or new "images" array
    const imgs = project.images || (project.image ? [project.image] : []);
    formImages = imgs.join(', ');
    
    editPanelOpen = true;
  }

  function saveProject() {
    const tags = formTags.split(',').map(t => t.trim()).filter(Boolean);
    const images = formImages.split(',').map(i => i.trim()).filter(Boolean);

    if (!formName.trim() || !formClient.trim()) {
      ontoast?.({ type: 'warning', message: 'Name and client are required' });
      return;
    }

    if (editMode === 'add') {
      const newProject = {
        id: `project-${Date.now()}`,
        name: formName.trim(),
        client: formClient.trim(),
        logo: formLogo.trim(),
        description: formDescription.trim(),
        tags,
        images
      };
      projects = [...projects, newProject];
      ontoast?.({ type: 'success', message: `Added "${formName.trim()}"` });
    } else if (editMode === 'edit' && editingProject) {
      projects = projects.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            name: formName.trim(),
            client: formClient.trim(),
            logo: formLogo.trim(),
            description: formDescription.trim(),
            tags,
            images
          };
        }
        return p;
      });
      ontoast?.({ type: 'success', message: `Updated "${formName.trim()}"` });
    }

    editPanelOpen = false;
    resetForm();
  }

  function confirmDelete(project) {
    deletingProject = project;
    showDeleteConfirm = true;
  }

  function executeDelete() {
    if (deletingProject) {
      const name = deletingProject.name;
      projects = projects.filter(p => p.id !== deletingProject.id);
      ontoast?.({ type: 'success', message: `Deleted "${name}"` });
    }
    showDeleteConfirm = false;
    deletingProject = null;
  }

  function cancelDelete() {
    showDeleteConfirm = false;
    deletingProject = null;
  }

  function moveUp(projectId) {
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx > 0) {
      const newProjects = [...projects];
      [newProjects[idx - 1], newProjects[idx]] = [newProjects[idx], newProjects[idx - 1]];
      projects = newProjects;
    }
  }

  function moveDown(projectId) {
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx < projects.length - 1) {
      const newProjects = [...projects];
      [newProjects[idx], newProjects[idx + 1]] = [newProjects[idx + 1], newProjects[idx]];
      projects = newProjects;
    }
  }

  export function getState() {
    return projects;
  }
</script>

<div class="portfolio-manager">
  <!-- Header -->
  <div class="pm-header animate-fade-in">
    <div class="pm-header-top">
      <div>
        <h2>Portfolio Manager</h2>
        <p class="pm-subtitle">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
      </div>
      <div class="pm-header-actions">
        <button class="btn-success" onclick={openAddPanel}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Project
        </button>
      </div>
    </div>
  </div>

  <!-- Projects list -->
  {#if !dataLoaded}
    <div style="padding: 2rem; text-align: center; color: var(--color-text-dim);">Loading portfolio projects...</div>
  {:else}
    <div class="pm-projects stagger">
      {#each projects as project, i (project.id)}
        <ProjectCard
          {project}
          isFirst={i === 0}
          isLast={i === projects.length - 1}
          onEdit={openEditPanel}
          onDelete={confirmDelete}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
        />
      {/each}
      {#if projects.length === 0}
        <div style="padding: 2rem; text-align: center; color: var(--color-text-dim);">No projects found. Add one above!</div>
      {/if}
    </div>
  {/if}
</div>

<!-- Add/Edit Panel -->
<EditPanel bind:open={editPanelOpen} title={editMode === 'add' ? 'Add New Project' : 'Edit Project'}>
  <div class="project-form">
    <div class="form-field">
      <label for="pf-name">Project Name *</label>
      <input id="pf-name" type="text" bind:value={formName} placeholder="e.g. CloudSync ERP" />
    </div>

    <div class="form-field">
      <label for="pf-client">Client *</label>
      <input id="pf-client" type="text" bind:value={formClient} placeholder="e.g. RetailMax India" />
    </div>

    <div class="form-field">
      <label for="pf-logo">Logo URL</label>
      <input id="pf-logo" type="text" bind:value={formLogo} placeholder="https://..." />
    </div>

    <div class="form-field">
      <label for="pf-desc">Description</label>
      <textarea id="pf-desc" bind:value={formDescription} rows="4" placeholder="Describe the project..."></textarea>
    </div>

    <div class="form-field">
      <label for="pf-tags">Tags <span class="form-hint">(comma-separated)</span></label>
      <input id="pf-tags" type="text" bind:value={formTags} placeholder="e.g. ERP, Dashboard, Analytics" />
    </div>

    <div class="form-field">
      <label>Project Images</label>
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem;">
        {#each formImages.split(',').map(i=>i.trim()).filter(Boolean) as img}
          <div style="position: relative; width: 100px; height: 100px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border);">
            <img src={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/images/${img}`} alt="Selected" style="width: 100%; height: 100%; object-fit: cover;" />
            <button type="button" style="position: absolute; top: 4px; right: 4px; width: 24px; height: 24px; border-radius: 50%; background: rgba(0,0,0,0.7); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px;" onclick={() => {
              const current = formImages.split(',').map(i=>i.trim()).filter(Boolean);
              formImages = current.filter(i => i !== img).join(', ');
            }}>✕</button>
          </div>
        {/each}
        <button type="button" class="add-image-btn" onclick={() => { fetchBucketImages(); showImageSelector = true; }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Image
        </button>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-secondary" onclick={() => { editPanelOpen = false; resetForm(); }}>
        Cancel
      </button>
      <button class="btn-primary" onclick={saveProject}>
        {editMode === 'add' ? 'Add Project' : 'Save Changes'}
      </button>
    </div>
  </div>
</EditPanel>

<!-- Delete Confirmation -->
{#if showDeleteConfirm}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={cancelDelete}></div>
  <div class="confirm-dialog">
    <h3>Delete Project</h3>
    <p>Are you sure you want to delete <strong>{deletingProject?.name}</strong>? This action cannot be undone.</p>
    <div class="confirm-dialog-actions">
      <button class="btn-secondary" onclick={cancelDelete}>Cancel</button>
      <button class="btn-danger" onclick={executeDelete}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
        Delete
      </button>
    </div>
  </div>
{/if}

<!-- Image Selector Modal -->
{#if showImageSelector}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={() => showImageSelector = false}></div>
  <div class="confirm-dialog" style="max-width: 600px; width: 100%;">
    <h3>Select an Image</h3>
    
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <p class="pm-subtitle" style="margin: 0;">Select an image or upload a new one.</p>
      <div>
        <input type="file" id="image-upload" accept="image/*" multiple style="display: none;" onchange={uploadImage} disabled={isUploadingImage} />
        <label for="image-upload" class="btn-primary" style="cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.8rem; border-radius: var(--radius-md); font-size: 0.875rem;">
          {#if isUploadingImage}
            <span class="spinner" style="width:12px;height:12px;"></span> Uploading...
          {:else}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload
          {/if}
        </label>
      </div>
    </div>
    
    <div class="image-grid">
      {#if bucketImages.length === 0}
        <p style="padding: 20px 0; color: var(--color-text-dim);">No images found in bucket.</p>
      {/if}
      {#each bucketImages as img}
        <div 
          class="image-item"
          class:selected={formImages.split(',').map(i=>i.trim()).filter(Boolean).includes(img)}
          onclick={() => { 
            let current = formImages.split(',').map(i=>i.trim()).filter(Boolean);
            if (current.includes(img)) {
              current = current.filter(i => i !== img);
            } else {
              current.push(img);
            }
            formImages = current.join(', ');
          }}
        >
          <img src={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/images/${img}`} alt={img} />
          <div class="image-name">{img}</div>
        </div>
      {/each}
    </div>
    
    <div class="confirm-dialog-actions" style="margin-top: 16px;">
      <button class="btn-primary" onclick={() => showImageSelector = false}>Done</button>
    </div>
  </div>
{/if}

<style>
  .portfolio-manager {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .pm-header {
    margin-bottom: 1.25rem;
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .pm-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .pm-header-top h2 {
    margin-bottom: 0.25rem;
  }

  .pm-subtitle {
    font-size: 0.8125rem;
    color: var(--color-text-dim);
  }

  .pm-header-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .pm-projects {
    display: flex;
    flex-direction: column;
  }

  /* Project form */
  .project-form {
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .form-hint {
    font-weight: 400;
    color: var(--color-text-dim);
    font-size: 0.75rem;
  }

  .form-actions {
    display: flex;
    gap: 0.625rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border);
  }

  .form-actions button {
    flex: 1;
  }

  /* Delete confirm overrides */
  .confirm-dialog strong {
    color: var(--color-text);
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 16px;
    max-height: 400px;
    overflow-y: auto;
  }

  .image-item {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    background: var(--color-surface);
    transition: all 0.2s;
    position: relative;
  }

  .image-item:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .image-item.selected {
    border-color: var(--color-primary);
  }

  .image-item.selected::after {
    content: "✓";
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--color-primary);
    color: var(--color-bg);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
  }

  .image-item img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    display: block;
  }

  .image-name {
    font-size: 0.75rem;
    padding: 8px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(0,0,0,0.2);
  }

  .add-image-btn {
    width: 100px;
    height: 100px;
    border-radius: var(--radius-md);
    background: var(--color-elevated);
    border: 1px dashed var(--color-border);
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    transition: border-color 0.2s;
  }
  
  .add-image-btn:hover {
    border-color: var(--color-accent);
  }
</style>
