<script>
  let { children, threshold = 0.15, delay = 0, direction = 'up', rootMargin = '0px 0px -60px 0px' } = $props();

  let element = $state(null);
  let isRevealed = $state(false);

  $effect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isRevealed = true;
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  });

  const translateMap = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
  };
</script>

<div
  bind:this={element}
  class="scroll-reveal"
  class:revealed={isRevealed}
  style="--reveal-transform: {translateMap[direction] || translateMap.up}; --reveal-delay: {delay}ms;"
>
  {@render children()}
</div>

<style>
  .scroll-reveal {
    height: 100%;
    opacity: 0;
    transform: var(--reveal-transform, translateY(40px));
    transition:
      opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }

  .scroll-reveal.revealed {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>
