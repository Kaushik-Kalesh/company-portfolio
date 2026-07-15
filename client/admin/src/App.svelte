<script>
    import TabBar from "./lib/TabBar.svelte";
    import ContentManager from "./lib/ContentManager.svelte";
    import PortfolioManager from "./lib/PortfolioManager.svelte";
    import Toast from "./lib/Toast.svelte";
    import contentData from "../../data/content.json";

    // Tab state
    let activeTab = $state("content");

    const tabs = [
        { id: "content", label: "Content", icon: "📝" },
        { id: "portfolio", label: "Portfolio", icon: "💼" },
        { id: "preview", label: "Preview", icon: "👁️" },
    ];

    // Toast state
    let toasts = $state([]);

    function addToast(toast) {
        toasts = [...toasts, { ...toast, id: Date.now() + Math.random() }];
    }

    // Live preview content (mirrors contentData for preview)
    let previewContent = $state({ ...contentData });
</script>

<div class="app">
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
        {:else if activeTab === "preview"}
            <div
                class="tab-content animate-fade-in"
                style="animation-delay: 50ms;"
            >
                <div class="preview-container">
                    <div class="preview-header">
                        <h2>Live Preview</h2>
                        <p class="preview-subtitle">
                            See how your content looks on the website
                        </p>
                    </div>

                    <!-- Hero preview -->
                    <div class="preview-section">
                        <div class="preview-label">Hero Section</div>
                        <div class="preview-card preview-hero">
                            <h1 class="preview-hero-title">
                                {previewContent.hero_headline}
                            </h1>
                            <p class="preview-hero-sub">
                                {previewContent.hero_subheadline}
                            </p>
                            <button class="preview-cta">Get Started</button>
                        </div>
                    </div>

                    <!-- Services preview -->
                    <div class="preview-section">
                        <div class="preview-label">Services Section</div>
                        <div class="preview-card">
                            <h2 class="preview-section-title">
                                {previewContent.services_headline}
                            </h2>
                            <p class="preview-section-sub">
                                {previewContent.services_subheadline}
                            </p>
                            <div class="preview-services-grid">
                                <div class="preview-service-item">
                                    <h4>
                                        {previewContent.service_software_title}
                                    </h4>
                                    <p>
                                        {previewContent.service_software_desc}
                                    </p>
                                </div>
                                <div class="preview-service-item">
                                    <h4>
                                        {previewContent.service_marketing_title}
                                    </h4>
                                    <p>
                                        {previewContent.service_marketing_desc}
                                    </p>
                                </div>
                                <div class="preview-service-item">
                                    <h4>{previewContent.service_both_title}</h4>
                                    <p>{previewContent.service_both_desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Portfolio preview -->
                    <div class="preview-section">
                        <div class="preview-label">Portfolio Section</div>
                        <div class="preview-card">
                            <h2 class="preview-section-title">
                                {previewContent.portfolio_headline}
                            </h2>
                            <p class="preview-section-sub">
                                {previewContent.portfolio_subheadline}
                            </p>
                        </div>
                    </div>

                    <!-- Contact preview -->
                    <div class="preview-section">
                        <div class="preview-label">Contact Section</div>
                        <div class="preview-card">
                            <h2 class="preview-section-title">
                                {previewContent.contact_headline}
                            </h2>
                            <p class="preview-section-sub">
                                {previewContent.contact_subheadline}
                            </p>
                        </div>
                    </div>

                    <!-- Footer preview -->
                    <div class="preview-section">
                        <div class="preview-label">Footer</div>
                        <div class="preview-card preview-footer">
                            <p class="preview-footer-tagline">
                                {previewContent.footer_tagline}
                            </p>
                            <p class="preview-footer-copyright">
                                {previewContent.footer_copyright}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </main>
</div>

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

    /* ============================
     Live Preview Styles
     ============================ */
    .preview-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    .preview-header {
        margin-bottom: 2rem;
        animation: fadeInUp 400ms var(--transition-smooth) both;
    }

    .preview-header h2 {
        margin-bottom: 0.25rem;
    }

    .preview-subtitle {
        font-size: 0.8125rem;
        color: var(--color-text-dim);
    }

    .preview-section {
        margin-bottom: 1.5rem;
        animation: fadeInUp 400ms var(--transition-smooth) both;
    }

    .preview-section:nth-child(2) {
        animation-delay: 50ms;
    }
    .preview-section:nth-child(3) {
        animation-delay: 100ms;
    }
    .preview-section:nth-child(4) {
        animation-delay: 150ms;
    }
    .preview-section:nth-child(5) {
        animation-delay: 200ms;
    }
    .preview-section:nth-child(6) {
        animation-delay: 250ms;
    }

    .preview-label {
        font-size: 0.6875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-dim);
        margin-bottom: 0.625rem;
    }

    .preview-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        transition: border-color var(--transition-normal);
    }

    .preview-card:hover {
        border-color: var(--color-border-hover);
    }

    /* Hero preview */
    .preview-hero {
        text-align: center;
        padding: 3rem 2rem;
        background: linear-gradient(
            135deg,
            var(--color-surface) 0%,
            rgba(99, 102, 241, 0.03) 100%
        );
        border-color: rgba(99, 102, 241, 0.15);
    }

    .preview-hero-title {
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 0.75rem;
        background: linear-gradient(
            135deg,
            var(--color-text) 0%,
            var(--color-accent-hover) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .preview-hero-sub {
        font-size: 0.9375rem;
        color: var(--color-text-muted);
        max-width: 520px;
        margin: 0 auto 1.5rem;
        line-height: 1.6;
    }

    .preview-cta {
        background: var(--color-accent);
        color: white;
        padding: 0.625rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.875rem;
    }

    .preview-cta:hover {
        background: var(--color-accent-hover);
    }

    /* Section title */
    .preview-section-title {
        font-size: 1.25rem;
        margin-bottom: 0.375rem;
    }

    .preview-section-sub {
        font-size: 0.875rem;
        color: var(--color-text-muted);
        margin-bottom: 1.25rem;
    }

    /* Services grid */
    .preview-services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .preview-service-item {
        background: var(--color-elevated);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        transition:
            border-color var(--transition-fast),
            transform var(--transition-fast);
    }

    .preview-service-item:hover {
        border-color: var(--color-border-hover);
        transform: translateY(-2px);
    }

    .preview-service-item h4 {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        color: var(--color-accent-hover);
    }

    .preview-service-item p {
        font-size: 0.8125rem;
        line-height: 1.5;
    }

    /* Footer preview */
    .preview-footer {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-elevated);
    }

    .preview-footer-tagline {
        font-size: 0.875rem;
        color: var(--color-text-muted);
        margin-bottom: 0.375rem;
    }

    .preview-footer-copyright {
        font-size: 0.75rem;
        color: var(--color-text-dim);
    }
</style>
