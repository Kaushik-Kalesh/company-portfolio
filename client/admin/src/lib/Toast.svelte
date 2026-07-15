<script>
  let { toasts = $bindable([]) } = $props();

  function removeToast(id) {
    toasts = toasts.filter(t => t.id !== id);
  }

  $effect(() => {
    if (toasts.length > 0) {
      const latest = toasts[toasts.length - 1];
      const timer = setTimeout(() => {
        removeToast(latest.id);
      }, 3500);
      return () => clearTimeout(timer);
    }
  });
</script>

<div class="toast-container">
  {#each toasts as toast (toast.id)}
    <div
      class="toast toast-{toast.type || 'info'}"
      class:toast-exiting={toast.exiting}
    >
      <span class="toast-icon">
        {#if toast.type === 'success'}✓
        {:else if toast.type === 'error'}✕
        {:else if toast.type === 'warning'}⚠
        {:else}ℹ
        {/if}
      </span>
      <span class="toast-message">{toast.message}</span>
      <button class="toast-close" onclick={() => removeToast(toast.id)}>✕</button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 200;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    pointer-events: none;
    max-width: 380px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    background: var(--color-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    animation: toastSlideIn 350ms var(--transition-smooth) both;
    pointer-events: all;
    font-size: 0.875rem;
  }

  .toast-exiting {
    animation: toastSlideOut 250ms var(--transition-smooth) both;
  }

  .toast-success {
    border-left: 3px solid var(--color-success);
  }

  .toast-error {
    border-left: 3px solid var(--color-danger);
  }

  .toast-warning {
    border-left: 3px solid var(--color-warning);
  }

  .toast-info {
    border-left: 3px solid var(--color-accent);
  }

  .toast-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.6875rem;
    font-weight: 700;
  }

  .toast-success .toast-icon {
    background: var(--color-success-glow);
    color: var(--color-success);
  }

  .toast-error .toast-icon {
    background: var(--color-danger-glow);
    color: var(--color-danger);
  }

  .toast-warning .toast-icon {
    background: var(--color-warning-glow);
    color: var(--color-warning);
  }

  .toast-info .toast-icon {
    background: var(--color-accent-glow);
    color: var(--color-accent);
  }

  .toast-message {
    flex: 1;
    color: var(--color-text);
    line-height: 1.4;
  }

  .toast-close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: var(--color-text-dim);
    cursor: pointer;
    padding: 0.25rem;
    font-size: 0.75rem;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);
  }

  .toast-close:hover {
    color: var(--color-text);
  }

  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translateX(100%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateX(100%) scale(0.95);
    }
  }
</style>
