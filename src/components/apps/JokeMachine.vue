<script setup>
import { onMounted, ref } from 'vue';
import Window from '../Window.vue';
import ChatMessage from './ChatMessage.vue';

const props = defineProps(['id']);

const jokes = ref([]);

const ask = async () => {
  const response = await fetch('https://v2.jokeapi.dev/joke/Programming')
  jokes.value.push(await response.json())
}

onMounted(async () => {
  await ask()
});
</script>

<template>
  <Window :id="id" class="gap-2" status="Press F to ask for another one">
    <ChatMessage side="right">¡Hola Karl! You got any jokes today?</ChatMessage>
    <ChatMessage v-if="jokes == null || jokes.length == 0 || jokes[0].error" side="left">Hey Karlos, sorry, I'm on vacation.</ChatMessage>
    <template v-else>
      <template v-for="(joke, i) in jokes" :key="i">
        <ChatMessage v-if="i != 0" side="right">You got another one?</ChatMessage>
        <template v-if="joke.type === 'single'">
          <ChatMessage side="left">Hey Karlos, did you hear this one before?<br>{{ joke.joke }}</ChatMessage>
          <ChatMessage side="right">HAHAH! You totally got me!</ChatMessage>
        </template>
        <template v-else>
          <ChatMessage side="left">Hey Karlos, i have a good one for you!<br>{{ joke.setup }}</ChatMessage>
          <ChatMessage side="right">Qué? I have no clue.</ChatMessage>
          <ChatMessage side="left">{{ joke.delivery }}</ChatMessage>
          <ChatMessage side="right">¡Hombré! I'd never have guessed that!</ChatMessage>
        </template>
      </template>
    </template>
  </Window>
</template>