<script>
  import content from '../../../data/content.json';

  let ready = $state(false);

  $effect(() => {
    // Staggered entrance on mount
    const timer = setTimeout(() => {
      ready = true;
    }, 100);
    return () => clearTimeout(timer);
  });

  function smoothScroll(targetId) {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<section id="hero" class="hero-section">
  <div class="container hero-container">
    <div class="hero-badge" class:visible={ready}>
      <span class="badge-dot"></span>
      Custom Software & Digital Marketing
    </div>

    <h1 class="hero-headline" class:visible={ready} data-content-id="hero_headline">
      {content.hero_headline}
    </h1>

    <p class="hero-subheadline" class:visible={ready} data-content-id="hero_subheadline">
      {content.hero_subheadline}
    </p>

    <div class="hero-actions" class:visible={ready}>
      <a
        href="#contact"
        class="btn btn-primary hero-btn"
        onclick={(e) => { e.preventDefault(); smoothScroll('#contact'); }}
      >
        Get in Touch
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <a
        href="#portfolio"
        class="btn btn-outline hero-btn"
        onclick={(e) => { e.preventDefault(); smoothScroll('#portfolio'); }}
      >
        Our Work
      </a>
    </div>
  </div>

  <!-- Decorative dashed lines -->
  <div class="hero-deco-left"></div>
  <div class="hero-deco-right"></div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 120px 0 100px;
  }



  .hero-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    position: relative;
    z-index: 1;
  }

  /* Badge */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--color-fg-muted);
    border: 1px dashed var(--color-border-strong);
    border-radius: 82px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .hero-badge.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    background: var(--color-accent);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  /* Headline */
  .hero-headline {
    font-size: clamp(2.8rem, 7vw, 5.2rem);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1.1;
    padding-bottom: 0.1em; /* Prevent descender cut-off like 'g' */
    
    /* Text Gradient & Glow */
    background: linear-gradient(
      135deg, 
      var(--color-fg) 20%, 
      var(--color-accent) 50%, 
      var(--color-fg) 80%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--color-fg);
    animation: textGradientFlow 12s ease infinite, textGlowPulse 5s ease-in-out infinite alternate;
    
    max-width: 800px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
  }
  
  @keyframes textGradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes textGlowPulse {
    0% { filter: drop-shadow(0 0 5px rgba(255, 79, 25, 0.05)); }
    100% { filter: drop-shadow(0 0 15px rgba(255, 79, 25, 0.25)); }
  }
  .hero-headline.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Subheadline */
  .hero-subheadline {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: var(--color-fg-muted);
    max-width: 580px;
    opacity: 0;
    transform: translateY(25px);
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
  }
  .hero-subheadline.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Actions */
  .hero-actions {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s;
  }
  .hero-actions.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-btn {
    padding: 16px 36px;
    font-size: 0.95rem;
  }

  /* Decorative dashed lines */
  .hero-deco-left,
  .hero-deco-right {
    position: absolute;
    top: 50%;
    width: 1px;
    height: 180px;
    border-left: 1.5px dashed var(--color-border);
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.5;
  }

  .hero-deco-left {
    left: 10%;
  }

  .hero-deco-right {
    right: 10%;
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 140px 0 80px;
      min-height: auto;
    }

    .hero-actions {
      flex-direction: column;
      width: 100%;
      max-width: 320px;
    }

    .hero-btn {
      width: 100%;
      justify-content: center;
    }

    .hero-deco-left,
    .hero-deco-right {
      display: none;
    }
  }
</style>
