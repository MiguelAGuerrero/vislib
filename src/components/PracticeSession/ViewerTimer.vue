<script setup>
import {
  ref, onMounted, watch, onUnmounted,
} from 'vue';

let interval = null;

const props = defineProps({
  seconds: Number,
  reset: {
    type: Boolean,
    default: true,
  },
  pause: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
});

const elapsed = ref(0);

function clear() {
  clearInterval(interval);
}

function timesUp() {
  return elapsed.value === props.seconds;
}

function start() {
  const SECOND = 1000;
  interval = setInterval(() => {
    if (props.pause || timesUp()) return;
    elapsed.value += 1;
  }, SECOND);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure minutes is always 2 digits
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0'); // Ensure seconds is always 2 digits
  return `${formattedMinutes}:${formattedSeconds}`;
}

onMounted(() => {
  start();
});

onUnmounted(() => {
  clearInterval(interval);
});

const emit = defineEmits(['done', 'reset', 'tick']);

watch(elapsed, () => {
  if (!timesUp()) return;
  clear();
  emit('done');
});

watch(() => props.reset, () => {
  elapsed.value = 0;
  clear();
  start();
  emit('reset');
});

</script>
<template>
  <div>
    <time class="timer-display">{{ formatTime(seconds - elapsed) }} </time>
    <div v-if="pause"> Paused </div>
  </div>
</template>

<style scoped>
</style>
