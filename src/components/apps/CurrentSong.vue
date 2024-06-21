<script>
import Window from '../Window.vue';

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
  <Window :id="id" status='Press F to pay respect'>
    <div v-if="song == null">
      <p>Asking Pink Floyd to compose a song...</p>
    </div>
    <div v-if="song != null && song.status != 200">
      <p>{{ song.message }}</p>
    </div>
    <iframe
      v-if="song != null && song.status == 200"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen=""
      frameBorder="0"
      height="352"
      loading="lazy"
      style="border-radius: 12px"
      v-bind:src="'https://open.spotify.com/embed/track/' + song.id"
      width="100%"
    ></iframe>
  </Window>
</template>