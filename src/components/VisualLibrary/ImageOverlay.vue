<script setup>
import { ref } from 'vue';
import { useToggle } from '@vueuse/core';

const overlay = ref(null);
const [showOverlay, toggleOverlay] = useToggle(false);

</script>

<template>
  <div class="overlay-container" @mouseenter="toggleOverlay(true)">
    <slot></slot>
    <div ref='overlay'
         class="overlay"
         v-show="showOverlay"
         @mouseleave="toggleOverlay(false)"
         @click="toggleOverlay(false)">
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay-container {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
}

</style>
