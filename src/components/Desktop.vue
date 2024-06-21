<script>
import { tasks } from '../tasks.js';

export default {
  data() {
    return {
      tasks,
      menu: null
    };
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      this.menu = {
        x: e.x,
        y: e.y
      }
    },
    closeMenu(e) {
      this.menu = null;
    }
  }
};
</script>

<template>
  <div id="desktop" class="bg-cyan-600 relative grow w-full" @contextmenu="handleClick" @keydown='console.log("hi")'>
    <div class="flex flex-col flex-wrap p-4">
      <button
        v-for="(app, key) in tasks.availableApps"
        :key="app.title"
        class="
          flex flex-col gap-2 items-center
          bg-transparent
          border-none
          shadow-none
          py-1
          px-3
          w-min
          active:enabled:!shadow-none
        "
        @click="tasks.openWindow(key)"
      >
        <img :alt="app.title" :src="app.icon" />
        <p class="leading-tight text-center active:shadow-none">{{ app.title }}</p>
      </button>
      <div v-if="menu !== null"
           :style="{top: menu.y + 'px', left: menu.x + 'px'}"
           class="absolute flex items-stretch min-w-32 window flex-col origin-top-left"
           @mouseleave="closeMenu">
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
      </div>
    </div>
    <template v-for="task of tasks.taskList" :key="task.id">
      <component
        :is="task.comp"
        :id="task.id"
        :isFocus="task.isFocus"
        :isMin="task.isMin"
        :zLevel="task.zLevel"
      ></component>
    </template>
  </div>
</template>
