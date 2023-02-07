<script>
import { tasks } from '../tasks.js';

export default {
  data() {
    return {
      tasks,
    };
  },
};
</script>

<template>
  <div id="desktop" class="bg-cyan-600 relative grow w-full">
    <div class="flex flex-col wrap">
      <button
        v-for="(app, key) in tasks.availableApps"
        @click="tasks.openWindow(key)"
        :key="app.title"
        class="
          bg-transparent
          border-none
          shadow-none
          text-center
          py-1
          px-3
          w-min
          active:enabled:shadow-none
        "
      >
        <img :src="app.icon" :alt="app.title" />
        <p>{{ app.title }}</p>
      </button>
    </div>
    <template v-for="task of tasks.tasklist" :key="task.id">
      <component
        :is="task.comp"
        :id="task.id"
        :isMin="task.isMin"
        :isFocus="task.isFocus"
        :zLevel="task.zLevel"
      ></component>
    </template>
  </div>
</template>
