<script>
  import content from '../../../data/content.json';
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  $effect(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  import { page } from '$app/stores';

  function smoothScroll(targetId, e) {
    mobileMenuOpen = false;
    
    // If we are not on the home page, let the browser navigate to /#section naturally
    if ($page.url.pathname !== '/') return;

    // We are on home page, so intercept and smooth scroll
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without jumping
      window.history.pushState(null, '', targetId);
    }
  }
</script>

<nav class="navbar" class:scrolled>
  <div class="navbar-inner">
    <a href="/#hero" class="nav-logo" onclick={(e) => smoothScroll('#hero', e)}>
      {content.companyName}
    </a>

    <div class="nav-links" class:open={mobileMenuOpen}>
      <a href="/#services" class="nav-link" onclick={(e) => smoothScroll('#services', e)}>Services</a>
      <a href="/portfolio" class="nav-link" onclick={() => mobileMenuOpen = false}>Portfolio</a>
      <a href="/#contact" class="nav-link" onclick={(e) => smoothScroll('#contact', e)}>Contact</a>
    </div>

    <button
      class="mobile-toggle"
      aria-label="Toggle navigation menu"
      onclick={() => mobileMenuOpen = !mobileMenuOpen}
    >
      <span class="hamburger" class:open={mobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </div>
</nav>

{#if mobileMenuOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="mobile-overlay" onclick={() => mobileMenuOpen = false} role="presentation"></div>
{/if}

<style>
  .navbar {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    width: calc(100% - 48px);
    max-width: 720px;
    border-radius: 82px;
    background: rgba(232, 232, 232, 0.67);
    backdrop-filter: blur(12px) saturate(180%) brightness(110%);
    -webkit-backdrop-filter: blur(12px) saturate(180%) brightness(110%);
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08), 0 6px 24px rgba(0, 0, 0, 0);
    transition:
      box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .navbar.scrolled {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.08);
    background: rgba(232, 232, 232, 0.82);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 28px;
  }

  .nav-logo {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--color-fg);
    text-decoration: none;
    user-select: none;
    transition: all 0.3s ease;
  }

  .nav-logo:hover {
    opacity: 0.7;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--color-fg);
    text-decoration: none;
    padding: 6px 16px;
    border-radius: 40px;
    transition:
      background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      color 0.3s ease;
    user-select: none;
  }

  .nav-link:hover {
    background: rgba(26, 23, 20, 0.07);
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 22px;
  }

  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-fg);
    border-radius: 2px;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(26, 23, 20, 0.2);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  @media (max-width: 768px) {
    .navbar {
      width: calc(100% - 32px);
      top: 12px;
    }

    .navbar-inner {
      padding: 10px 20px;
    }

    .mobile-toggle {
      display: block;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 8px;
      right: 8px;
      background: rgba(232, 232, 232, 0.92);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border-radius: 16px;
      flex-direction: column;
      padding: 16px;
      gap: 4px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    }

    .nav-links.open {
      display: flex;
    }

    .nav-link {
      width: 100%;
      text-align: center;
      padding: 12px 16px;
      font-size: 0.95rem;
    }

    .mobile-overlay {
      display: block;
    }
  }
</style>
