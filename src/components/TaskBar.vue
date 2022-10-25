<script>
export default {
  name: "TaskBar",
  data() {
    return {
      time: new Date(),
    };
  },
  mounted() {
    setInterval(() => this.setTime(), 1000);
  },
  methods: {
    setTime() {
      this.time = new Date();
    },
  },
};
</script>

<template>
  <nav class="taskbar window">
    <div class="part">
      <button class="start-button">
        <img src="/logo.svg" alt="Logo" />Start
      </button>
      <span class="divider"></span>
    </div>
    <div>
      <button class="start-button">
        {{ time.getHours() + ":" + time.getMinutes() }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.part {
  display: flex;
  align-items: stretch;
}

.divider {
  width: 4px;
  border-radius: 2px;
  background-color: white;
  border: 1px solid gray;
  margin: 0 3px;
}

.start-button {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
}

.start-button img {
  height: 1rem;
}
</style>
