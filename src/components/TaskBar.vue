<script>
import { tasks } from '../tasks.js';

export default {
  data() {
    return {
      time: new Date(),
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
  },
};
</script>

<template>
  <nav class="window z-50 justify-between flex">
    <div class="flex items-center space-x-1">
      <button class="flex items-center justify-around px-2">
        <img src="/logo.svg" class="h-3" alt="Logo" />Start
      </button>
      <span class=""></span>
      <div class="flex items-center">
        <template v-for="task in tasks.tasklist" :key="task.id">
          <button
            class="flex items-center space-x-1 justify-around px-2"
            @click="tasks.toggleWindow(task.id)"
          >
            <img :src="task.icon" class="h-4" alt="" />
            <p>{{ task.title }}</p>
          </button>
        </template>
      </div>
    </div>
    <div class="">
      <button class="">
        {{ time.getHours() + ':' + time.getMinutes() }}
      </button>
    </div>
  </nav>
</template>