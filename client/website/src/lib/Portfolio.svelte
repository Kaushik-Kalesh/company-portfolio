<script>
    import content from "../../../data/content.json";
    import portfolio from "../../../data/portfolio.json";
    import ScrollReveal from "./ScrollReveal.svelte";

    let activeProject = $state(null);
    let currentImageIndex = $state(0);

    function openProject(project) {
        activeProject = project;
        currentImageIndex = 0;
        if (typeof document !== "undefined")
            document.body.style.overflow = "hidden";
    }

    function closeProject() {
        activeProject = null;
        if (typeof document !== "undefined") document.body.style.overflow = "";
    }

    function nextImage(e) {
        e.stopPropagation();
        const images =
            activeProject.images ||
            (activeProject.image ? [activeProject.image] : []);
        if (images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }
    }

    function prevImage(e) {
        e.stopPropagation();
        const images =
            activeProject.images ||
            (activeProject.image ? [activeProject.image] : []);
        if (images.length > 0) {
            currentImageIndex =
                (currentImageIndex - 1 + images.length) % images.length;
        }
    }

    function getImageUrl(img) {
        const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
        return img.startsWith("http") ? img : `${API_URL}/images/${img}`;
    }

    const softwareKeywords = [
        "software",
        "app",
        "web",
        "system",
        "platform",
        "bot",
        "dashboard",
        "crm",
        "ai",
        "cloud",
        "tech",
    ];

    // Categorize projects
    const softwareProjects = portfolio.filter(
        (p) =>
            p.category === "software" ||
            (!p.category &&
                p.tags.some((t) =>
                    softwareKeywords.some((kw) => t.toLowerCase().includes(kw)),
                )),
    );
    const marketingProjects = portfolio.filter(
        (p) => !softwareProjects.includes(p),
    );
</script>

<section id="portfolio" class="section portfolio-section">
    <div class="container">
        <ScrollReveal>
            <div class="portfolio-header">
                <h2 data-content-id="portfolio_headline">
                    {content.portfolio_headline}
                </h2>
                <p data-content-id="portfolio_subheadline">
                    {content.portfolio_subheadline}
                </p>
            </div>
        </ScrollReveal>

        <!-- Software Projects -->
        {#if softwareProjects.length > 0}
            <h3 class="category-title">Software</h3>
            <div class="portfolio-grid">
                {#each softwareProjects as project, i}
                    <ScrollReveal delay={i * 100}>
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="card portfolio-card"
                            data-project-id={project.id}
                            onclick={() => openProject(project)}
                        >
                            <!-- Accent line -->
                            <div class="card-accent-bar"></div>

                            <div class="portfolio-card-header">
                                <span class="project-client"
                                    >{project.client}</span
                                >
                                <span class="project-index"
                                    >{String(i + 1).padStart(2, "0")}</span
                                >
                            </div>

                            <h3 class="project-name">{project.name}</h3>
                            <p class="project-desc">{project.description}</p>

                            <div class="project-tags">
                                {#each project.tags as tag}
                                    <span class="tag">{tag}</span>
                                {/each}
                            </div>

                            <div class="project-arrow">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </div>
                    </ScrollReveal>
                {/each}
            </div>
        {/if}

        <!-- Marketing Projects -->
        {#if marketingProjects.length > 0}
            <h3 class="category-title" style="margin-top: 64px;">
                Digital Marketing & SEO
            </h3>
            <div class="portfolio-grid">
                {#each marketingProjects as project, i}
                    <ScrollReveal delay={i * 100}>
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="card portfolio-card"
                            data-project-id={project.id}
                            onclick={() => openProject(project)}
                        >
                            <!-- Accent line -->
                            <div class="card-accent-bar"></div>

                            <div class="portfolio-card-header">
                                <span class="project-client"
                                    >{project.client}</span
                                >
                                <span class="project-index"
                                    >{String(i + 1).padStart(2, "0")}</span
                                >
                            </div>

                            <h3 class="project-name">{project.name}</h3>
                            <p class="project-desc">{project.description}</p>

                            <div class="project-tags">
                                {#each project.tags as tag}
                                    <span class="tag">{tag}</span>
                                {/each}
                            </div>

                            <div class="project-arrow">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </div>
                    </ScrollReveal>
                {/each}
            </div>
        {/if}
    </div>
</section>

{#if activeProject}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-overlay" onclick={closeProject}>
        <div class="modal-content card" onclick={(e) => e.stopPropagation()}>
            <button class="modal-close" onclick={closeProject}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><line x1="18" y1="6" x2="6" y2="18"></line><line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                    ></line></svg
                >
            </button>

            {#if activeProject.images?.length > 0 || activeProject.image}
                {@const images = activeProject.images || [activeProject.image]}
                <div class="modal-image-container">
                    <img
                        src={getImageUrl(images[currentImageIndex])}
                        alt={activeProject.name}
                        class="modal-image"
                    />

                    {#if images.length > 1}
                        <button
                            class="carousel-btn prev-btn"
                            onclick={prevImage}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                ><polyline points="15 18 9 12 15 6"
                                ></polyline></svg
                            >
                        </button>
                        <button
                            class="carousel-btn next-btn"
                            onclick={nextImage}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                ><polyline points="9 18 15 12 9 6"
                                ></polyline></svg
                            >
                        </button>
                        <div class="carousel-dots">
                            {#each images as _, i}
                                <span
                                    class="dot"
                                    class:active={i === currentImageIndex}
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        currentImageIndex = i;
                                    }}
                                ></span>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/if}

            <div class="modal-body">
                <div class="portfolio-card-header">
                    <span class="project-client">{activeProject.client}</span>
                </div>
                <h3 class="modal-title">{activeProject.name}</h3>

                <div class="project-tags">
                    {#each activeProject.tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>

                <div class="modal-desc">
                    <p>
                        {activeProject.longDescription ||
                            activeProject.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .portfolio-section {
        position: relative;
    }

    .portfolio-header {
        text-align: center;
        margin-bottom: 64px;
    }

    .portfolio-header h2 {
        margin-bottom: 16px;
    }

    .portfolio-header p {
        max-width: 520px;
        margin: 0 auto;
    }

    .category-title {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 24px;
        letter-spacing: -0.02em;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

    .portfolio-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 14px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .card-accent-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(
            90deg,
            var(--color-accent),
            var(--color-accent-alt)
        );
        border-radius: 16px 16px 0 0;
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .portfolio-card:hover .card-accent-bar {
        opacity: 1;
    }

    .portfolio-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .project-client {
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-accent);
    }

    .project-index {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        opacity: 0.5;
    }

    .project-name {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        line-height: 1.25;
        margin: 0;
    }

    .project-desc {
        font-size: 0.92rem;
        line-height: 1.6;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
    }

    .tag {
        font-size: 0.73rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        padding: 5px 14px;
        border-radius: 82px;
        background: rgba(26, 23, 20, 0.05);
        color: var(--color-fg-muted);
        transition: all 0.3s ease;
    }

    .portfolio-card:hover .tag {
        background: rgba(26, 23, 20, 0.08);
        color: var(--color-fg);
    }

    .project-arrow {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: transparent;
        color: var(--color-fg-muted);
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        opacity: 0;
        transform: translate(-4px, 4px);
    }

    .portfolio-card:hover .project-arrow {
        opacity: 1;
        transform: translate(0, 0);
        background: rgba(26, 23, 20, 0.06);
        color: var(--color-fg);
    }

    @media (max-width: 900px) {
        .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .portfolio-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin: 0 auto;
        }
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(26, 23, 20, 0.4);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background: var(--color-bg);
        padding: 0;
        width: 100%;
        max-width: 800px;
        max-height: 90vh;
        border-radius: 16px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);

        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .modal-content::-webkit-scrollbar {
        display: none;
    }

    .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(26, 23, 20, 0.1);
        color: var(--color-fg);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        z-index: 10;
        transition: background 0.2s;
    }
    .modal-close:hover {
        background: rgba(26, 23, 20, 0.2);
    }

    .modal-image-container {
        width: 100%;
        height: 400px;
        background: rgba(26, 23, 20, 0.05);
        border-radius: 16px 16px 0 0;
        overflow: hidden;
        position: relative;
    }

    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(26, 23, 20, 0.5);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
    }
    .carousel-btn:hover {
        background: rgba(26, 23, 20, 0.8);
    }
    .prev-btn {
        left: 16px;
    }
    .next-btn {
        right: 16px;
    }

    .carousel-dots {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
    }
    .carousel-dots .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s;
    }
    .carousel-dots .dot.active {
        background: white;
        transform: scale(1.2);
    }

    .modal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .modal-body {
        padding: 32px;
    }

    .modal-title {
        font-size: 2rem;
        font-weight: 700;
        margin: 8px 0 16px;
        letter-spacing: -0.02em;
    }

    .modal-desc {
        margin-top: 24px;
        font-size: 1.05rem;
        line-height: 1.7;
        color: var(--color-fg-muted);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
</style>
