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
      </button>
    {/each}
  </div>
</nav>

<style>
  .tab-bar {
    position: sticky;
    top: 24px;
    z-index: 50;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    pointer-events: none;
  }

  .tab-bar-inner {
    display: flex;
    gap: 4px;
    background: rgba(20, 20, 20, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 6px;
    border-radius: 999px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    pointer-events: auto;
  }

  .tab-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 999px;
    transition: all var(--transition-fast);
    white-space: nowrap;
  }

  .tab-item:hover {
    color: var(--color-text);
    background: rgba(255, 255, 255, 0.05);
  }

  .tab-item:active {
    transform: scale(0.96);
  }

  .tab-active {
    color: white;
    background: var(--color-accent) !important;
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
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
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.0625rem 0.4375rem;
    border-radius: 999px;
    min-width: 18px;
    text-align: center;
    line-height: 1.4;
  }
</style>
