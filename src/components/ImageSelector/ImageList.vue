<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ImageViewer from '../ImageViewer.vue';
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
        v-for="(img) of images"
        :show="showOverlay"
        :key="img">
      <div class="image-container">
        <ImageViewer
            draggable="false"
            :src="img"
            :size="20"
            @click="emit('click:image', img)">
        </ImageViewer>
      </div>
      <template #overlay>
        <div class="overlay">
          <FontAwesomeIcon
              class="trash-icon"
              :icon="faTrash"
              @click="emit('remove:image', img)" />
        </div>
      </template>
    </MagOverlay>
  </div>
</template>

<style scoped>
.image-container:hover {
  transform: scale(0.95);
}

.preview-list {
  display: grid;
  overflow: auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

@media(max-width: 768px) {
  .preview-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .image-container {
    aspect-ratio: 1/1;
    height: 1fr;
  }
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
