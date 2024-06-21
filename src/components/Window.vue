<script>
import { tasks } from '../tasks.js';

export default {
  props: ['id', 'isMin', 'isFocus', 'zLevel', 'status'],
  data() {
    return {
      tasks: tasks,
      title: 'Loading...',
      isMax: false,
      isDragged: false,
      lastPos: null,
      lastSize: null,
      dragStartDiff: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
    };
  },
  mounted() {
    const clientRect = this.$refs.window.getBoundingClientRect();
    const desktop = document.getElementById('desktop');

    this.pos.x = desktop.offsetWidth / 2 - clientRect.width / 2;
    this.pos.y = desktop.offsetHeight / 2 - clientRect.height / 2;

    window.onresize = this.handleResize;

    this.title = tasks.getTaskById(this.id).title
  },
  methods: {
    maximize(event) {
      this.isMax = !this.isMax;

      if (this.isMax) {
        this.lastSize = {
          width: this.$refs.window.style.width,
          height: this.$refs.window.style.height,
        };

        this.lastPos = {
          x: this.pos.x,
          y: this.pos.y,
        };

        this.$refs.window.style.width = null;
        this.$refs.window.style.height = null;
        this.pos.x = 0;
        this.pos.y = 0;
      } else {
        if (this.lastSize != null) {
          this.$refs.window.style.width = this.lastSize.width;
          this.$refs.window.style.height = this.lastSize.height;
        }

        if (this.lastPos != null) {
          this.pos = {
            x: this.lastPos.x,
            y: this.lastPos.y,
          };
        }
      }
    },
    constrain() {
      const win = this.$refs.window;
      const desktop = document.getElementById('desktop');

      if (this.pos.x > desktop.offsetWidth - win.offsetWidth)
        this.pos.x = desktop.offsetWidth - win.offsetWidth;
      if (this.pos.y > desktop.offsetHeight - win.offsetHeight)
        this.pos.y = desktop.offsetHeight - win.offsetHeight;

      if (this.pos.x < 0) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = 0;

      if (win.offsetWidth > desktop.offsetWidth)
        win.style.width = desktop.offsetWidth + 'px';
      if (win.offsetHeight > desktop.offsetHeight)
        win.style.height = desktop.offsetHeight + 'px';
    },
    handleResize(event) {
      this.constrain();
    },
    handleMouseDown(event) {
      event.preventDefault();
      if (this.isDragged) return;
      this.isDragged = true;
      let clientRect = event.target.getBoundingClientRect();
      this.dragStartDiff.x = event.clientX - clientRect.x;
      this.dragStartDiff.y = event.clientY - clientRect.y;
      document.onmousemove = this.handleMouseMove;
      document.onmouseup = this.handleMouseUp;
    },
    handleMouseMove(event) {
      if (this.isDragged) {
        this.pos.x = event.clientX - this.dragStartDiff.x;
        this.pos.y = event.clientY - this.dragStartDiff.y;
        this.constrain();
      }
    },
    handleMouseUp(event) {
      this.isDragged = false;
      document.onmousemove = null;
      document.onmouseup = null;
    },
  },
};
</script>

<template>
  <div
    v-show="!isMin"
    ref="window"
    :class="{
      'w-full': isMax,
      'h-full': isMax,
      'resize-none': isMax,
      'inset-0': isMax,
    }"
    :style="{
      top: pos.y + 'px',
      left: pos.x + 'px',
      zIndex: zLevel,
    }"
    class="
      window
      absolute
      flex flex-col
      overflow-auto
      resize
      min-w-[20rem]
      max-w-[100vw]
      min-h-[4rem]
      max-h-[100%]
    "
    @mousedown="tasks.focusWindow(id)"
  >
    <div
      :class="{ inactive: !isFocus }"
      class="title-bar cursor-move"
      @mousedown.self="handleMouseDown"
    >
      <div class="title-bar-text" @mousedown="handleMouseDown">{{ title }}</div>
      <div class="title-bar-controls cursor-pointer">
        <button
          aria-label="Minimize"
          class="bg-win97"
          @click="tasks.toggleWindow(id)"
        ></button>
        <button
          :aria-label="isMax ? 'Restore' : 'Maximize'"
          class="bg-win97"
          @click="maximize"
        ></button>
        <button
          aria-label="Close"
          class="bg-win97"
          @click="tasks.closeWindow(id)"
        ></button>
      </div>
    </div>
    <div class="window-body overflow-auto flex-1 flex flex-col justify-start" v-bind="$attrs">
      <slot></slot>
    </div>
    <div v-if="status" class="status-bar">
      <p class="status-bar-field">{{ status }}</p>
      <span class="w-4"></span>
    </div>
  </div>
</template>

