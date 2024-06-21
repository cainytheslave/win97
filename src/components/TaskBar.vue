<script>
import { tasks } from '../tasks.js';
import StartMenu from './StartMenu.vue';

export default {
  components: { StartMenu },
  data() {
    return {
      time: new Date(),
      calOpen: false,
      startOpen: false, 
      tasks,
    };
  },
  mounted() {
    setInterval(() => this.setTime(), 3000);
  },
  methods: {
    setTime() {
      this.time = new Date();
    },
    zeroPad(num, places) {
      return String(num).padStart(places, '0');
    }
  },
};
</script>

<template>
  <nav class="window z-50 relative justify-between flex">
    <StartMenu v-if="startOpen" @keydown.esc="startOpen = false"></StartMenu>

    <div class="flex items-center space-x-1">
      <button class="flex items-center justify-center font-semibold gap-2 px-1" @click="startOpen = !startOpen">
        <img alt="Logo" class="h-5" src="../assets/icons/windows.png" />Start
      </button>

      <div class="flex items-center">
        <template v-for="task in tasks.tasklist" :key="task.id">
          <button
            class="flex items-center space-x-1 justify-around px-2"
            @click="tasks.toggleWindow(task.id)"
          >
            <img :src="task.icon" alt="" class="h-4" />
            <p>{{ task.title }}</p>
          </button>
        </template>
      </div>
    </div>
    <div class="">
      <button class="">
        {{ zeroPad(time.getHours(), 2) + ':' + zeroPad(time.getMinutes(), 2) }}
      </button>
    </div>
  </nav>
</template>
