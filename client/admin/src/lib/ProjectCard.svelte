<script>
  let { project, onEdit, onDelete, onMoveUp, onMoveDown, isFirst = false, isLast = false } = $props();
</script>

<div class="project-card card animate-fade-in-up">
  <div class="project-card-header">
    <div class="project-info">
      {#if project.logo}
        <img src={project.logo} alt={project.name} class="project-logo" />
      {:else}
        <div class="project-logo-placeholder">
          {project.name.charAt(0)}
        </div>
      {/if}
      <div>
        <h4 class="project-name">{project.name}</h4>
        <span class="project-client">{project.client}</span>
      </div>
    </div>
    <div class="project-actions">
      <button
        class="btn-icon"
        onclick={() => onMoveUp?.(project.id)}
        disabled={isFirst}
        title="Move up"
      >↑</button>
      <button
        class="btn-icon"
        onclick={() => onMoveDown?.(project.id)}
        disabled={isLast}
        title="Move down"
      >↓</button>
      <button
        class="btn-icon"
        onclick={() => onEdit?.(project)}
        title="Edit project"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          <path d="m15 5 4 4"/>
        </svg>
      </button>
      <button
        class="btn-icon btn-icon-danger"
        onclick={() => onDelete?.(project)}
        title="Delete project"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    </div>
  </div>

  <p class="project-description">{project.description}</p>

  {#if project.tags && project.tags.length > 0}
    <div class="project-tags">
      {#each project.tags as tag}
        <span class="badge">{tag}</span>
      {/each}
    </div>
  {/if}

  {#if project.images && project.images.length > 0}
    <div class="project-image-carousel">
      {#each project.images as img}
        <img src="{import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/images/{img}" alt="{project.name} preview" />
      {/each}
    </div>
  {:else if project.image}
    <div class="project-image-carousel">
      <img src="{import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/images/{project.image}" alt="{project.name} preview" />
    </div>
  {/if}
</div>

<style>
  .project-card {
    margin-bottom: 0.75rem;
  }

  .project-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .project-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
  }

  .project-logo {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    object-fit: cover;
    flex-shrink: 0;
  }

  .project-logo-placeholder {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  .project-name {
    font-size: 0.9375rem;
    margin-bottom: 0.125rem;
  }

  .project-client {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .project-actions {
    display: flex;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .btn-icon-danger:hover:not(:disabled) {
    color: var(--color-danger) !important;
    background: var(--color-danger-glow) !important;
  }

  .project-description {
    font-size: 0.8125rem;
    margin-bottom: 0.75rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .project-image-carousel {
    margin-top: 0.75rem;
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding-bottom: 0.5rem; /* for scrollbar */
  }

  .project-image-carousel::-webkit-scrollbar {
    height: 4px;
  }
  .project-image-carousel::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }

  .project-image-carousel img {
    height: 120px;
    width: auto;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    object-fit: cover;
    flex-shrink: 0;
  }
</style>
