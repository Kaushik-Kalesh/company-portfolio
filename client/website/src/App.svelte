<script>
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import Services from './lib/Services.svelte';
  import Portfolio from './lib/Portfolio.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';
  import WhatsAppFab from './lib/WhatsAppFab.svelte';
</script>

<Navbar />

<div class="global-bg-shapes">
  <div class="shape shape-1"></div>
  <div class="shape shape-2"></div>
  <div class="shape shape-3"></div>
</div>

<main>
  <Hero />

  <hr class="dashed-separator" />

  <Services />

  <hr class="dashed-separator" />

  <Portfolio />

  <hr class="dashed-separator" />

  <Contact />
</main>

<Footer />

<WhatsAppFab />

<style>
  main {
    flex: 1;
  }

  .global-bg-shapes {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: floatShape 20s infinite ease-in-out alternate;
  }

  .shape-1 {
    width: 35vmin; height: 35vmin;
    background: var(--color-accent);
    top: -5%; left: -5%;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 45vmin; height: 45vmin;
    background: var(--color-accent-alt);
    bottom: -10%; right: -5%;
    animation-delay: -5s;
  }

  .shape-3 {
    width: 25vmin; height: 25vmin;
    background: #FFD166;
    top: 40%; left: 50%;
    animation-delay: -10s;
  }

  @keyframes floatShape {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(25vw, -20vh) scale(1.2); }
    66% { transform: translate(-25vw, 25vh) scale(0.8); }
    100% { transform: translate(15vw, -15vh) scale(1.1); }
  }
</style>
