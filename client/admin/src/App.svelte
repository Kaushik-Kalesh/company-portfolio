<script>
    import TabBar from "./lib/TabBar.svelte";
    import ContentManager from "./lib/ContentManager.svelte";
    import PortfolioManager from "./lib/PortfolioManager.svelte";
    import Toast from "./lib/Toast.svelte";

    // Tab state
    let activeTab = $state("content");
    let isAuthenticated = $state(false);
    let pinInput = $state("");
    let pinError = $state(false);

    let contentManager;
    let portfolioManager;
    let isSaving = $state(false);

    async function saveAllToServer() {
        isSaving = true;
        let success = true;
        try {
            if (contentManager) await contentManager.saveToServer();
        } catch (e) {
            success = false;
            addToast({ type: 'error', message: 'Failed to save content: ' + e.message });
        }
        
        try {
            if (portfolioManager) await portfolioManager.saveToServer();
        } catch (e) {
            success = false;
            addToast({ type: 'error', message: 'Failed to save portfolio: ' + e.message });
        }

        if (success) {
            addToast({ type: 'success', message: 'All changes saved successfully!' });
        }
        isSaving = false;
    }

    function checkPin() {
        if (pinInput === "2714") {
            isAuthenticated = true;
            pinError = false;
        } else {
            pinError = true;
            pinInput = "";
        }
    }

    const tabs = [
        { id: "content", label: "Content", icon: "📝" },
        { id: "portfolio", label: "Portfolio", icon: "💼" }
    ];

    // Toast state
    let toasts = $state([]);

    function addToast(toast) {
        toasts = [...toasts, { ...toast, id: Date.now() + Math.random() }];
    }
</script>

{#if !isAuthenticated}
<div class="pin-screen">
    <div class="pin-box animate-fade-in">
        <div class="pin-icon">🔒</div>
        <h2>Admin Access</h2>
        <p class="pin-subtitle">Enter your PIN to manage the website</p>
        
        <div class="pin-input-group">
            <input 
                type="password" 
                bind:value={pinInput} 
                onkeydown={(e) => e.key === 'Enter' && checkPin()} 
                placeholder="••••" 
                class="pin-input"
                class:error={pinError}
                maxlength="4"
                autofocus
            />
            <button onclick={checkPin} class="btn-primary pin-btn">
                Unlock
            </button>
        </div>
        {#if pinError}
            <p class="error-msg animate-shake">Incorrect PIN</p>
        {/if}
    </div>
</div>
{:else}
<div class="app animate-fade-in">
    <!-- Tab navigation -->
    <TabBar {tabs} bind:activeTab />

    <!-- Tab content -->
    <main class="app-main">
        <div class="tab-content animate-fade-in" style:display={activeTab === 'content' ? 'block' : 'none'} style="animation-delay: 50ms;">
            <ContentManager bind:this={contentManager} ontoast={addToast} />
        </div>
        <div class="tab-content animate-fade-in" style:display={activeTab === 'portfolio' ? 'block' : 'none'} style="animation-delay: 50ms;">
            <PortfolioManager bind:this={portfolioManager} ontoast={addToast} />
        </div>
    </main>

    <!-- Global Save Button -->
    <button class="global-save-btn btn-primary" onclick={saveAllToServer} disabled={isSaving}>
        {#if isSaving}
            <span class="spinner"></span> Saving...
        {:else}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save All
        {/if}
    </button>
</div>
{/if}

<!-- Toast notifications -->
<Toast bind:toasts />

<style>
    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    /* Main content */
    .app-main {
        flex: 1;
        padding-bottom: 3rem;
    }

    .tab-content {
        animation: fadeIn 300ms var(--transition-smooth) both;
    }

    .global-save-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 100;
        padding: 0.75rem 1.5rem;
        border-radius: 999px;
        box-shadow: 0 8px 32px rgba(255, 79, 25, 0.4);
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .global-save-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(255, 79, 25, 0.6);
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }

    /* PIN Screen */
    .pin-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-bg);
        padding: 2rem;
    }

    .pin-box {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        width: 100%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .pin-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .pin-box h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .pin-subtitle {
        color: var(--color-text-dim);
        font-size: 0.875rem;
        margin-bottom: 2rem;
    }

    .pin-input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .pin-input {
        flex: 1;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.75rem;
        color: var(--color-text);
        font-size: 1.25rem;
        text-align: center;
        letter-spacing: 0.5em;
        transition: border-color 0.2s;
    }

    .pin-input:focus {
        border-color: var(--color-accent);
        outline: none;
    }

    .pin-input.error {
        border-color: var(--color-error);
    }

    .pin-btn {
        padding: 0 1.5rem;
    }

    .error-msg {
        color: var(--color-error);
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .animate-shake {
        animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
    }
</style>
