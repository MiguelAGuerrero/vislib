<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const overlay = ref(null);
const isVisible = ref(false);

function showOverlay() {
  isVisible.value = true;
}

function hideOverlay() {
  isVisible.value = false;
}

onClickOutside(overlay, hideOverlay);

</script>

<template>
  <div class="overlay-container" @mouseenter="showOverlay">
    <slot></slot>
    <div ref='overlay'
         class="overlay"
         v-show="isVisible"
         @mouseleave="hideOverlay"
         @click="showOverlay">
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
}

</style>
