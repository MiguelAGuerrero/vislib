<script setup>
import {
  ref, defineProps, defineEmits,
} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ImageViewer from '../ImageViewer.vue';
import ImageOverlay from './ImageOverlay.vue';

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
const imageGallery = ref();
const imageSize = ref('128px'); // Initial image size

</script>

<template>
  <div ref="imageGallery" class="image-gallery">
    <ImageOverlay
        v-for="(img) of images"
        :show="showOverlay"
        :key="img"
    >
      <span class="image-container"
            @mouseenter="showOverlay = true"
            @mouseleave="showOverlay = false"
      >
        <ImageViewer
            :src="img"
            :size="imageSize"
            @click="emit('click:image', img)"
        >
        </ImageViewer>
      </span>
      <template #overlay>
        <div class="overlay">
          <FontAwesomeIcon
              class="trash-icon"
              :icon="faTrash"
              @click="emit('remove:image', img)"
          />
        </div>
      </template>
    </ImageOverlay>
  </div>
</template>

<style scoped>


.image-container > *:hover {
  padding: 1px; /* Prevents image from jumping when overlay is shown */
  transform: scale(0.95);
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 256px));
  gap: 4px;
  justify-content: center;
  align-content: start;
  padding: 4px;
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
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: var(--color-black) 0 0 3px;
}

.trash-icon:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .preview-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
