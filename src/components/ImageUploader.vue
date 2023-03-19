<script setup>
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import useImageReader from '../composition/useImageReader';

const emit = defineEmits(['upload']);
const fileInput = ref();

function openFileDialog() {
  fileInput.value.click();
}

onMounted(() => {
  const uploads = useImageReader(fileInput);
  watch(uploads, (value) => emit('upload', value));
});

</script>

<template>
  <span class="image-uploader-container">
    <FontAwesomeIcon :icon="faUpload" class="image-uploader__icon"></FontAwesomeIcon>
    <span class="upload-button" @click="openFileDialog"> Upload Image </span>
    <input
        ref="fileInput"
        multiple
        type="file"
        class='hidden-input'
        accept="image/*"
    />
  </span>
</template>

<style scoped>

.image-uploader-container {
  display: flex;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: var(--image-selector-border-radius);
  color: var(--color-black);
  padding: 0 1rem;
  cursor: pointer;
}

.image-uploader-container:hover {
  opacity: 80%;
}

.image-uploader__icon {
  width: 2rem;
  height: auto;
  color: var(--color-black);
}

.upload-button {
  padding: 1rem;
  width: fit-content;
  text-align: left;
}

.hidden-input {
  display: none;
}

</style>
