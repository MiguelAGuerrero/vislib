<script setup>

import ImagePreviewList from './ImageList.vue';
import ImageDropzone from './ImageDropzone.vue';
import ImagePasteInput from './ImagePasteInput.vue';
import ImageUploader from './ImageUploader.vue';

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

// eslint-disable-next-line no-unused-vars
function addImages(imageUrls) {
  emitAddEvent(imageUrls.filter((imageUrl) => !imageExists(imageUrl)));
}

// eslint-disable-next-line no-unused-vars
function removeImage(imageUrl) {
  emitRemoveEvent([imageUrl]);
}

</script>

<template>
  <image-dropzone
      class="dropzone-container"
      :show-prompt="images.length === 0"
      @drop:url="addImage"
      @drop:data-url="addImage"
      @drop:csv="addImages"
  >
    <div class="container">
      <image-preview-list :images="images" @remove:image="removeImage"></image-preview-list>
      <span class="divider" />
      <span class="actions">
        <image-paste-input @paste="addImage" class="paste-box"/>
        <span class="or-divider"> OR </span>
        <ImageUploader @upload="addImages"/>
      </span>
    </div>
  </image-dropzone>
</template>

<style scoped>

.container {
  --spacing: 1rem;
  display: grid;
  background-color: var(--color-black);
  padding: var(--spacing);
  grid-template: 1fr auto / auto;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.divider {
  width: 100%;
  height: 0.1rem;
  background-color: var(--color-tertiary);
  border-radius: 2rem;
  margin: 1rem 0;
}

.actions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr;
  gap: var(--spacing);
}

.or-divider {
  width: 100%;
  text-align: center;
  align-self: center;
  font-size: 1.5rem;
  padding: 0 1rem;
}

.or-divider::before {
  margin-right: var(--spacing);
}

.or-divider::after {
  margin-left: var(--spacing);
}

</style>
