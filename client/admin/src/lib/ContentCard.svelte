<script>
  let { contentKey, value, searchQuery = '', onclick } = $props();

  let preview = $derived(value.length > 60 ? value.slice(0, 60) + '…' : value);

  function highlightMatch(text, query) {
    if (!query || query.length < 1) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  let highlightedKey = $derived(highlightMatch(contentKey, searchQuery));
  let highlightedPreview = $derived(highlightMatch(preview, searchQuery));
</script>

<button class="content-card card card-interactive" {onclick}>
  <div class="content-card-header">
    <span class="content-key">{@html highlightedKey}</span>
    <span class="content-arrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </span>
  </div>
  <p class="content-preview">{@html highlightedPreview}</p>
</button>

<style>
  .content-card {
    width: 100%;
    text-align: left;
    display: block;
    animation: fadeInUp 400ms var(--transition-smooth) both;
  }

  .content-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .content-key {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-accent-hover);
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-key :global(mark) {
    background: rgba(99, 102, 241, 0.3);
    color: white;
    padding: 0.0625rem 0.125rem;
    border-radius: 2px;
  }

  .content-arrow {
    flex-shrink: 0;
    color: var(--color-text-dim);
    display: flex;
    align-items: center;
    transition: transform var(--transition-fast), color var(--transition-fast);
  }

  .content-card:hover .content-arrow {
    transform: translateX(3px);
    color: var(--color-accent);
  }

  .content-preview {
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .content-preview :global(mark) {
    background: rgba(245, 158, 11, 0.25);
    color: var(--color-warning);
    padding: 0.0625rem 0.125rem;
    border-radius: 2px;
  }
</style>
