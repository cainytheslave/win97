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
  <div @contextmenu="handleClick" id="desktop" class="bg-cyan-600 relative grow w-full">
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
        {{ app.title }}
      </button>
      <div v-if="menu !== null"
           @mouseleave="closeMenu"
           :style="{top: menu.y + 'px', left: menu.x + 'px'}"
           class="absolute flex items-stretch min-w-32 window flex-col origin-top-left">
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
      </div>
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
