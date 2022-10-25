<script setup>
</script>

<template>
  <div class="window center" style="width: 320px">
    <div class="title-bar">
      <div class="title-bar-text">Todays song</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <iframe
        style="border-radius: 0"
        src="https://open.spotify.com/embed/track/7fJALFBexDXzu0QdatF5O4?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
    <div class="status-bar">
      <p class="status-bar-field">Press F1 for help</p>
    </div>
  </div>
</template>

<style scoped>
.center {
  margin: 0 auto;
  margin-top: 2rem;
}
</style>
