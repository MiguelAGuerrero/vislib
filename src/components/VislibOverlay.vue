<script setup>
import { useVModel } from '@vueuse/core';
import { watch } from 'vue';
import useBodyScroll from '../composables/useBodyScroll.js';
const props = defineProps(['modelValue']);
const visible = useVModel(props, 'modelValue');
const scroll = useBodyScroll();
watch(visible, (value) => {
  if (value) {
    scroll.disable();
  } else {
    scroll.enable();
  }
});

function closeOverlay() {
  visible.value = false;
}

</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="visible" class="overlay" @click="closeOverlay">
        <span class="overlay-content" @click.stop>
          <slot></slot>
        </span>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  height: 100svh;

  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-content {
  padding: 1rem;
  height: min-content;
}

</style>
