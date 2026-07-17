<script>
  import content from '../../../data/content.json';
  import ScrollReveal from './ScrollReveal.svelte';

  const services = [
    {
      titleKey: 'service_software_title',
      descKey: 'service_software_desc',
      icon: 'code',
    },
    {
      titleKey: 'service_marketing_title',
      descKey: 'service_marketing_desc',
      icon: 'megaphone',
    },
    {
      titleKey: 'service_both_title',
      descKey: 'service_both_desc',
      icon: 'rocket',
    },
    {
      titleKey: 'service_infra_title',
      descKey: 'service_infra_desc',
      icon: 'server',
    },
  ];

  const iconPaths = {
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    megaphone: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    rocket: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  };
</script>

<section id="services" class="section services-section">
  <div class="container">
    <ScrollReveal>
      <div class="services-header">
        <h2 data-content-id="services_headline">{content.services_headline}</h2>
        <p data-content-id="services_subheadline">{content.services_subheadline}</p>
      </div>
    </ScrollReveal>

    <div class="services-grid">
      {#each services as service, i}
        <ScrollReveal delay={i * 120}>
          <div class="card service-card">
            <div class="service-icon">
              {#if service.icon === 'code'}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              {:else if service.icon === 'megaphone'}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 11l18-5v12L3 14v-3z"></path>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
              {:else if service.icon === 'rocket'}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12zm0 0h7.5"></path>
                </svg>
              {:else}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              {/if}
            </div>

            <h3 data-content-id={service.titleKey}>{content[service.titleKey]}</h3>
            <p data-content-id={service.descKey}>{content[service.descKey]}</p>

            <div class="service-number">{String(i + 1).padStart(2, '0')}</div>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-section {
    position: relative;
  }

  .services-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .services-header h2 {
    margin-bottom: 16px;
  }

  .services-header p {
    max-width: 500px;
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .service-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    overflow: hidden;
  }

  .service-card h3 {
    margin: 4px 0 0;
  }

  .service-card p {
    font-size: 0.95rem;
    line-height: 1.65;
    flex: 1;
  }

  .service-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(26, 23, 20, 0.05);
    color: var(--color-fg);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .service-card:hover .service-icon {
    background: var(--color-fg);
    color: var(--color-bg);
    transform: scale(1.05);
  }

  .service-number {
    font-size: 4rem;
    font-weight: 800;
    color: rgba(26, 23, 20, 0.04);
    position: absolute;
    bottom: -8px;
    right: 12px;
    line-height: 1;
    letter-spacing: -0.05em;
    pointer-events: none;
    transition: color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .service-card:hover .service-number {
    color: rgba(26, 23, 20, 0.08);
  }

  @media (max-width: 900px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .services-grid {
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 0 auto;
    }
  }
</style>
