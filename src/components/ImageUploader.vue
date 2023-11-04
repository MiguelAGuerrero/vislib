<script setup>
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import useImageReader from '../composables/useImageReader';

const emit = defineEmits(['import']);
const fileInput = ref();

function openFileDialog() {
  fileInput.value.click();
}

onMounted(() => {
  const imports = useImageReader(fileInput);
  watch(imports, (value) => emit('import', value));
});

</script>

<template>
  <span class="image-importer-container">
    <FontAwesomeIcon :icon="faFileImport" class="image-importer__icon"></FontAwesomeIcon>
    <span class="import-button" @click="openFileDialog"> Import Images </span>
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

.image-importer-container {
  display: flex;
  grid-template-columns: 1fr 1fr;
  color: var(--color-accent);
  padding: 0 1rem;
  cursor: pointer;
  border-radius: 0;
}

.image-importer__icon {
  width: 2rem;
  height: auto;
}

.import-button {
  padding: 1rem;
  text-align: center;
}

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .image-importer-container {
    grid-template-columns: 1fr;
  }
}

</style>
