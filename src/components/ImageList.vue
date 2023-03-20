<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ImageViewer from './ImageViewer.vue';
import MagOverlay from './MagOverlay.vue';

defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(['click:image', 'remove:image']);
const showOverlay = ref(true);

</script>

<template>
  <div class="preview-list">
    <MagOverlay
        :show="showOverlay"
        class="image-container"
        v-for="(img) of images"
        :key="img">
      <ImageViewer
          class="image"
          draggable="false"
          :src="img"
          @click="emit('click:image', img)">
      </ImageViewer>
      <template #overlay>
        <div class="overlay">
          <font-awesome-icon
              class="trash-icon"
              :icon="faTrash"
              @click="emit('remove:image', img)" />
        </div>
      </template>
    </MagOverlay>
  </div>
</template>

<style scoped>

.image-container {
  --image-size: 128px;
  transition: 0.1s;
  height: calc(var(--image-size) + 5rem);
  border-radius: var(--border-radius);
  box-shadow: black 0 0 4px;
  overflow: hidden;
}

.image-container:hover {
  transform: scale(0.95);
}

.image {
  height: 100%;
}

.preview-list {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.overlay {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0.10rem 0.5rem;
  place-content: end;
  transition: opacity 0.1s ease-in-out;
  opacity: 0;
  border-radius: 0.5rem;
  position: relative;
  z-index: 0;
}

.overlay:hover {
  opacity: 100%;
  z-index: 1;
}

.trash-icon {
  opacity: 100%;
  cursor: pointer;
  color: var(--color-black);
  background-color: var(--color-white);
  padding:  0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: var(--color-black) 0 0 3px;
}

.trash-icon:hover {
  transform: scale(1.1);
}

</style>
