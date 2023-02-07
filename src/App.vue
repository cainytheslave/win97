<script>
import Desktop from './components/Desktop.vue';
import TaskBar from './components/TaskBar.vue';

import { tasks } from './tasks.js';

export default {
  data() {
    return {
      tasks,
    };
  },
  components: {
    Desktop,
    TaskBar,
  },
};
</script>

<template>
  <div class="h-screen w-full flex flex-col">
    <Desktop />
    <TaskBar />
  </div>
</template>t