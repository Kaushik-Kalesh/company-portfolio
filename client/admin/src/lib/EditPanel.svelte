<script>
  let { open = $bindable(false), title = '', onclose, children } = $props();

  function close() {
    open = false;
    onclose?.();
  }

  function handleOverlayClick() {
    close();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && open) {
      close();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="edit-overlay" onclick={handleOverlayClick}></div>
  <div class="edit-panel">
    <div class="edit-panel-header">
      <h3>{title}</h3>
      <button class="btn-icon" onclick={close} aria-label="Close panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
    </div>
    <div class="edit-panel-body">
      {@render children?.()}
    </div>
  </div>
{/if}

<style>
  .edit-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 90;
    animation: fadeIn 200ms ease both;
  }

  .edit-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 520px;
    background: var(--color-bg);
    border-left: 1px solid var(--color-border);
    z-index: 100;
    display: flex;
    flex-direction: column;
    animation: panelSlideIn 350ms var(--transition-smooth) both;
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.4);
  }

  .edit-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .edit-panel-header h3 {
    font-size: 1.0625rem;
    font-weight: 600;
  }

  .edit-panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  @keyframes panelSlideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
