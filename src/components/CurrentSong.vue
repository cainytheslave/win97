<script>
import Window from './Window.vue';

export default {
  props: ['id'],
  data() {
    return {
      song: null,
    };
  },
  mounted() {
    console.log('quering');
    fetch('https://api.win97.de/api/song', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        this.song = json;
      });
    });
  },
  components: {
    Window,
  },
};
</script>

<template>
  <Window :id="id">
    <div v-if="song == null">
      <p>Asking Pink Floyd to compose a song...</p>
    </div>
    <div v-if="song != null && song.status != 200">
      <p>{{ song.message }}</p>
    </div>
    <iframe
      style="border-radius: 12px"
      v-bind:src="'https://open.spotify.com/embed/track/' + song.id"
      width="100%"
      height="352"
      frameBorder="0"
      v-if="song != null && song.status == 200"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </Window>
</template>