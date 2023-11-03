<script setup>
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import useImageReader from '../composables/useImageReader';

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
    <span class="upload-button" @click="openFileDialog"> Upload Images </span>
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
  color: var(--color-accent);
  padding: 0 1rem;
  cursor: pointer;
  border-radius: 0;
}

.image-uploader__icon {
  width: 2rem;
  height: auto;
}

.upload-button {
  padding: 1rem;
  text-align: center;
}

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .image-uploader-container {
    grid-template-columns: 1fr;
  }
}

</style>
