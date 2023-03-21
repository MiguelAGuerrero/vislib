<script setup>
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import useImageReader from '../../composition/useImageReader';

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
  <span class="image-uploader-container input">
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
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
  color: var(--color-accent);
  padding: 0 1rem;
  cursor: pointer;
}

.image-uploader__icon {
  width: 2rem;
  height: auto;
}

.upload-button {
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.hidden-input {
  display: none;
}

</style>
