<script>
    import TabBar from "./lib/TabBar.svelte";
    import ContentManager from "./lib/ContentManager.svelte";
    import PortfolioManager from "./lib/PortfolioManager.svelte";
    import Toast from "./lib/Toast.svelte";
    import contentData from "../../data/content.json";

    // Tab state
    let activeTab = $state("content");
    let isAuthenticated = $state(false);
    let pinInput = $state("");
    let pinError = $state(false);

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
        {#if activeTab === "content"}
            <div
                class="tab-content animate-fade-in"
                style="animation-delay: 50ms;"
            >
                <ContentManager ontoast={addToast} />
            </div>
        {:else if activeTab === "portfolio"}
            <div
                class="tab-content animate-fade-in"
                style="animation-delay: 50ms;"
            >
                <PortfolioManager ontoast={addToast} />
            </div>
        {/if}
    </main>
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
