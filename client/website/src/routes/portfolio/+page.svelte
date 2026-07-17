<script>
  import Portfolio from '../../lib/Portfolio.svelte';
  import content from '../../../../data/content.json';
</script>

<svelte:head>
  <title>Our Portfolio | {content.companyName}</title>
  <meta name="description" content="View our latest custom software solutions and digital marketing projects." />
</svelte:head>

<div class="portfolio-page">
  <Portfolio />
</div>

<style>
  .portfolio-page {
    padding-top: 80px; /* offset for navbar */
    min-height: 100vh;
  }
</style>
