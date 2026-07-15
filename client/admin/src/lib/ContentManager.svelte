<script>
  import { onMount } from 'svelte';
  import SearchBar from './SearchBar.svelte';
  import ContentCard from './ContentCard.svelte';
  import EditPanel from './EditPanel.svelte';

  let { ontoast } = $props();

  // Reactive state
  let contentData = $state({});
  let content = $state({});
  let dataLoaded = $state(false);
  let searchQuery = $state('');
  let editPanelOpen = $state(false);
  let editingKey = $state(null);
  let editValue = $state('');
  let pendingChanges = $state({});
  let isSaving = $state(false);

  onMount(async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const res = await fetch(`${API_URL}/api/data/content.json`);
      if (res.ok) {
        const data = await res.json();
        if (!data.companyName) data.companyName = "CPL";
        contentData = JSON.parse(JSON.stringify(data));
        content = JSON.parse(JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
      ontoast?.({ type: 'error', message: 'Failed to load content from server' });
    }
    dataLoaded = true;
  });

  // Derived: content entries as array
  let entries = $derived(Object.entries(content));

  // Derived: filtered entries based on search
  let filteredEntries = $derived(() => {
    if (!searchQuery.trim()) return entries;
    const q = searchQuery.toLowerCase().trim();
    return entries.filter(([key, value]) =>
      key.toLowerCase().includes(q) || value.toLowerCase().includes(q)
    );
  });

  // Derived: count of pending changes
  let pendingCount = $derived(Object.keys(pendingChanges).length);

  function handleSearchChange(query) {
    searchQuery = query;
  }

  function openEditor(key) {
    editingKey = key;
    editValue = content[key];
    editPanelOpen = true;
  }

  function saveEdit() {
    if (editingKey && editValue !== contentData[editingKey]) {
      content[editingKey] = editValue;
      pendingChanges[editingKey] = editValue;
      pendingChanges = { ...pendingChanges }; // trigger reactivity
      ontoast?.({ type: 'success', message: `Updated "${editingKey}"` });
    }
    editPanelOpen = false;
    editingKey = null;
  }

  function revertEdit() {
    if (editingKey) {
      editValue = contentData[editingKey];
    }
  }

  async function saveToServer() {
    isSaving = true;
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      
      const result = await response.json();
      if (result.success) {
        pendingChanges = {}; // clear pending since saved to server
        contentData = JSON.parse(JSON.stringify(content)); // Update base truth
        ontoast?.({ type: 'success', message: 'Saved to server successfully' });
      } else {
        ontoast?.({ type: 'error', message: 'Server error: ' + result.error });
      }
    } catch (err) {
      ontoast?.({ type: 'error', message: 'Failed to connect to server' });
    } finally {
      isSaving = false;
    }
  }

  function clearPending() {
    content = { ...contentData };
    pendingChanges = {};
    ontoast?.({ type: 'info', message: 'All changes reverted' });
  }
</script>

<div class="content-manager">
  <!-- Header -->
  <div class="cm-header animate-fade-in">
    <div class="cm-header-top">
      <div>
        <h2>Content Manager</h2>
        <p class="cm-subtitle">Search and edit website content — {entries.length} entries</p>
      </div>
      <div class="cm-header-actions">
        {#if pendingCount > 0}
          <button class="btn-secondary" onclick={clearPending}>
            Revert All
          </button>
        {/if}
        <button class="btn-primary" onclick={saveToServer} disabled={pendingCount === 0 || isSaving}>
          {#if isSaving}
            <span class="spinner"></span> Saving...
          {:else}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save to Server
            {#if pendingCount > 0}
              <span class="pending-badge">{pendingCount}</span>
            {/if}
          {/if}
        </button>
      </div>
    </div>

    {#if !dataLoaded}
      <div style="padding: 2rem; text-align: center; color: var(--color-text-dim);">Loading content...</div>
    {:else}
      <div class="cm-search">
        <SearchBar
          bind:value={searchQuery}
          placeholder="Search by key or value... (e.g. 'hero', 'imagine', 'footer')"
          onchange={handleSearchChange}
        />
      </div>
    {/if}
  </div>

  <!-- Results info -->
  <div class="cm-results-info animate-fade-in">
    {#if searchQuery.trim()}
      <span class="results-count">
        {filteredEntries().length} result{filteredEntries().length !== 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"
      </span>
    {/if}
    {#if pendingCount > 0}
      <span class="pending-indicator">
        <span class="pending-dot"></span>
        {pendingCount} pending change{pendingCount !== 1 ? 's' : ''}
      </span>
    {/if}
  </div>

  <!-- Content cards list -->
  <div class="cm-cards stagger">
    {#if filteredEntries().length > 0}
      {#each filteredEntries() as [key, value] (key)}
        <ContentCard
          contentKey={key}
          {value}
          {searchQuery}
          onclick={() => openEditor(key)}
        />
      {/each}
    {:else}
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No results found</h3>
        <p>Try a different search term</p>
      </div>
    {/if}
  </div>
</div>

<!-- Edit Panel -->
<EditPanel bind:open={editPanelOpen} title="Edit Content" onclose={() => { editingKey = null; }}>
  {#if editingKey}
    <div class="edit-form">
      <div class="edit-field">
        <span class="field-label">Content Key</span>
        <div class="edit-key-display">{editingKey}</div>
      </div>

      <div class="edit-field">
        <span class="field-label">Original Value</span>
        <div class="edit-original">{contentData[editingKey]}</div>
      </div>

      <div class="edit-field">
        <label for="edit-content-value">New Value</label>
        <textarea
          id="edit-content-value"
          bind:value={editValue}
          rows="6"
          placeholder="Enter new content..."
        ></textarea>
      </div>

      {#if editValue !== contentData[editingKey]}
        <div class="edit-diff">
          <span class="diff-badge">Modified</span>
        </div>
      {/if}

      <div class="edit-actions">
        <button class="btn-secondary" onclick={revertEdit}>
          Reset to Original
        </button>
        <button class="btn-primary" onclick={saveEdit}>
          Save Changes
        </button>
      </div>
    </div>
  {/if}
</EditPanel>

<style>
  .content-manager {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .cm-header {
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

  .cm-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .cm-header-top h2 {
    margin-bottom: 0.25rem;
  }

  .cm-subtitle {
    font-size: 0.8125rem;
    color: var(--color-text-dim);
  }

  .cm-header-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .pending-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.0625rem 0.4375rem;
    border-radius: 999px;
    font-size: 0.6875rem;
    font-weight: 600;
  }

  .cm-search {
    max-width: 100%;
  }

  .cm-results-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0 1rem;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    min-height: 2rem;
  }

  .results-count strong {
    color: var(--color-accent-hover);
  }

  .pending-indicator {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--color-warning);
    font-size: 0.8125rem;
  }

  .pending-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-warning);
    animation: pulse 2s ease-in-out infinite;
  }

  .cm-cards {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  /* Edit form styles */
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .edit-field {
    display: flex;
    flex-direction: column;
  }

  .edit-key-display {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.875rem;
    color: var(--color-accent-hover);
    background: var(--color-accent-subtle);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    letter-spacing: 0.02em;
  }

  .edit-original {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    background: var(--color-surface);
    padding: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    line-height: 1.6;
    max-height: 120px;
    overflow-y: auto;
  }

  .edit-diff {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .diff-badge {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-warning);
    background: var(--color-warning-glow);
    padding: 0.1875rem 0.5rem;
    border-radius: 999px;
  }

  .edit-actions {
    display: flex;
    gap: 0.625rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--color-border);
  }

  .edit-actions button {
    flex: 1;
  }

  .field-label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-bottom: 0.375rem;
    letter-spacing: 0.01em;
  }
</style>
