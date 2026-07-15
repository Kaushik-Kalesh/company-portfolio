<script>
  let { value = $bindable(''), placeholder = 'Search...', onchange } = $props();
  let focused = $state(false);
  let inputEl = $state(null);

  function handleInput(e) {
    value = e.target.value;
    onchange?.(value);
  }

  function clearSearch() {
    value = '';
    onchange?.('');
    inputEl?.focus();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      clearSearch();
    }
  }
</script>

<div class="search-bar" class:search-bar-focused={focused}>
  <span class="search-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  </span>
  <input
    bind:this={inputEl}
    type="text"
    {placeholder}
    value={value}
    oninput={handleInput}
    onfocus={() => focused = true}
    onblur={() => focused = false}
    onkeydown={handleKeydown}
    class="search-input"
  />
  {#if value}
    <button class="search-clear" onclick={clearSearch} aria-label="Clear search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    </button>
  {/if}
</div>

<style>
  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast),
                box-shadow var(--transition-fast),
                background-color var(--transition-fast);
  }

  .search-bar:hover {
    border-color: var(--color-border-hover);
  }

  .search-bar-focused {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-glow);
    background: var(--color-elevated);
  }

  .search-icon {
    position: absolute;
    left: 0.875rem;
    color: var(--color-text-dim);
    display: flex;
    align-items: center;
    transition: color var(--transition-fast);
    pointer-events: none;
  }

  .search-bar-focused .search-icon {
    color: var(--color-accent);
  }

  .search-input {
    width: 100%;
    background: transparent;
    border: none;
    padding: 0.625rem 2.5rem 0.625rem 2.75rem;
    color: var(--color-text);
    font-size: 0.875rem;
    outline: none;
    box-shadow: none;
  }

  .search-input:focus {
    box-shadow: none;
    border: none;
    background: transparent;
  }

  .search-input::placeholder {
    color: var(--color-text-dim);
  }

  .search-clear {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    color: var(--color-text-dim);
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast), background var(--transition-fast);
  }

  .search-clear:hover {
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.06);
  }

  .search-clear:active {
    transform: scale(0.9);
  }
</style>
