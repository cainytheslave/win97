<script>
export default {
  data() {
    return {
      isOpen: true,
      isMax: false,
      isDragged: false,
      lastPos: null,
      lastSize: null,
      dragStartDiff: { x: 0, y: 0 },
      pos: { x: 0, y: 0 },
    };
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
      const pos = {
        x: event.clientX - this.dragStartDiff.x,
        y: event.clientY - this.dragStartDiff.y,
      };

      const win = this.$refs.window;
      const desktop = document.getElementById("desktop");

      if (this.isDragged) {
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;

        if (pos.x > desktop.offsetWidth - win.offsetWidth)
          pos.x = desktop.offsetWidth - win.offsetWidth;
        if (pos.y > desktop.offsetHeight - win.offsetHeight)
          pos.y = desktop.offsetHeight - win.offsetHeight;

        this.pos.x = pos.x;
        this.pos.y = pos.y;
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
    ref="window"
    v-show="isOpen"
    :class="{
      'w-full': isMax,
      'h-full': isMax,
      'resize-none': isMax,
      'inset-0': isMax,
    }"
    :style="{ top: pos.y + 'px', left: pos.x + 'px' }"
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
  >
    <div class="title-bar cursor-move" @mousedown="handleMouseDown">
      <div class="title-bar-text cursor-default">Todays song</div>
      <div class="title-bar-controls cursor-pointer">
        <button aria-label="Minimize" @click="isOpen = false"></button>
        <button aria-label="Maximize" @click="maximize"></button>
        <button aria-label="Close" @click="isOpen = false"></button>
      </div>
    </div>
    <div class="window-body overflow-hidden flex-1">
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
      <p class="status-bar-field">Press F to pay respect</p>
      <span class="w-4"></span>
    </div>
  </div>
</template>

