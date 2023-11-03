<script setup>

import ImagePreviewList from './ImageList.vue';
import ImageDropzone from './ImageDropzone.vue';

const props = defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(['add', 'remove', 'paste']);

function imageExists(imageUrl) {
  return imageUrl && props.images.includes(imageUrl);
}

function emitAddEvent(images) {
  emit('add', images);
}

function emitRemoveEvent(images) {
  emit('remove', images);
}

function addImage(imageUrl) {
  if (imageExists(imageUrl)) return;
  emitAddEvent([imageUrl]);
}

function addImages(imageUrls) {
  emitAddEvent(imageUrls.filter((imageUrl) => !imageExists(imageUrl)));
}

function removeImage(imageUrl) {
  emitRemoveEvent([imageUrl]);
}

</script>

<template>
  <ImageDropzone
      class="dropzone-container"
      :show-prompt="images.length === 0"
      @drop:url="addImage"
      @drop:data-url="addImage"
      @drop:csv="addImages"
  >
    <div class="container">
      <ImagePreviewList :images="images" @remove:image="removeImage"></ImagePreviewList>
    </div>
  </ImageDropzone>
</template>

<style scoped>

.container {
  display: grid;
  grid-template: 1fr auto / auto;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: var(--color-primary);
  color: var(--color-tertiary);
}

.actions > * {
  min-height: 1rem;
}

</style>
