<script setup>
import karl from '../../assets/karl-s.jpg';
import mexicanKarl from '../../assets/mexican-karl-s.jpg';

const props = defineProps(['message', 'side']);
</script>

<template>
  <div :class="{
    'flex-row-reverse': side === 'right',
    'pl-14': side == 'right',
    'pr-14': side == 'left',
    }" class="flex gap-1">
      <img :src="side === 'left' ? karl : mexicanKarl" class="w-12 h-12 rounded-full">
      <div :class="{'bg-white': side === 'left', 'bg-yellow-100': side == 'right'}" class="p-2 rounded-lg max-w-">
          <p class="text-lg"><slot /></p>
      </div>
  </div>
</template>