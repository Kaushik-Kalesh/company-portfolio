<script>
  let { tabs = [], activeTab = $bindable(''), onchange } = $props();

  function selectTab(tab) {
    activeTab = tab.id;
    onchange?.(tab.id);
  }
</script>

<nav class="tab-bar">
  <div class="tab-bar-inner">
    {#each tabs as tab (tab.id)}
      <button
        class="tab-item"
        class:tab-active={activeTab === tab.id}
        onclick={() => selectTab(tab)}
      >
        <span class="tab-icon">{tab.icon}</span>
        <span class="tab-label">{tab.label}</span>
        {#if tab.badge}
          <span class="tab-badge">{tab.badge}</span>
        {/if}
        {#if activeTab === tab.id}
          <div class="tab-indicator"></div>
        {/if}
      </button>
    {/each}
  </div>
</nav>

<style>
  .tab-bar {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
    background: rgba(26, 26, 26, 0.85);
  }

  .tab-bar-inner {
    display: flex;
    gap: 0.25rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tab-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.125rem;
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    transition: color var(--transition-fast),
                background var(--transition-fast);
    white-space: nowrap;
  }

  .tab-item:hover {
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.03);
  }

  .tab-item:active {
    transform: none;
  }

  .tab-active {
    color: var(--color-text);
  }

  .tab-icon {
    font-size: 1.05rem;
    line-height: 1;
  }

  .tab-label {
    letter-spacing: 0.01em;
  }

  .tab-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    background: var(--color-accent);
    color: white;
    padding: 0.0625rem 0.4375rem;
    border-radius: 999px;
    min-width: 18px;
    text-align: center;
    line-height: 1.4;
  }

  .tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0.75rem;
    right: 0.75rem;
    height: 2px;
    background: var(--color-accent);
    border-radius: 2px 2px 0 0;
    animation: tabIndicator 250ms var(--transition-smooth) both;
  }

  @keyframes tabIndicator {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }
</style>
