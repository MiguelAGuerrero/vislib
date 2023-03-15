<script setup>

import { onMounted, ref, watch } from 'vue';
import ImagePreviewList from './ImageList.vue';
import ImageDropzone from './ImageDropzone.vue';
import useImageReader from '../composition/useImageReader';

const props = defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});

const pasteBoxStyle = ref(['.paste-box']);
const emit = defineEmits(['add', 'remove']);
const fileInput = ref();
function imageExists(imageUrl) {
  return imageUrl && props.images.includes(imageUrl);
}

function emitAddEvent(images) {
  emit('add', images);
}

function emitRemoveEvent(images) {
  emit('remove', images);
}

// eslint-disable-next-line no-unused-vars
function addImage(imageUrl) {
  if (imageExists(imageUrl)) return;
  emitAddEvent([imageUrl]);
}

// eslint-disable-next-line no-unused-vars
async function addPastedImageLink(event) {
  event.preventDefault();
  const { clipboardData } = event;
  const pastedData = clipboardData.getData('text');
  addImage(pastedData);
}

// eslint-disable-next-line no-unused-vars
function addImages(imageUrls) {
  emitAddEvent(imageUrls.filter((imageUrl) => !imageExists(imageUrl)));
}

function handlePaste(event) {
  pasteBoxStyle.value = ['.paste-box--active'];
  addPastedImageLink(event);
}

// eslint-disable-next-line no-unused-vars
function removeImage(imageUrl) {
  emitRemoveEvent([imageUrl]);
}

onMounted(() => {
  const uploads = useImageReader(fileInput.value);
  watch(uploads, (value) => addImages(value));
});

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
        <input class="paste-box" type="text" placeholder="Paste image link"
               @paste="handlePaste"/>
        <span class="or-divider"> OR </span>
        <span>
          <label class="upload-image__label"> Upload </label>
          <input
              ref="fileInput"
              multiple
              type="file"
              class="upload-image"
          />
        </span>
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

.paste-box,
.upload-image {
  border-radius: 1rem;
  padding: 1rem;
  border: var(--color-tertiary) solid 0.1rem;
  background: none;
  width: 100%;
}

.upload-image__label {
  position: absolute;
  visibility: hidden;
  align-content: center;
}

.paste-box::placeholder {
  font-size: 1rem;
  color: var(--color-white);
  opacity: 80%
}

</style>
