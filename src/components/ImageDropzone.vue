<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faImages } from '@fortawesome/free-solid-svg-icons';

defineProps({
  showPrompt: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['drop:csv', 'drop:url', 'drop:data-url']);
const dropping = ref(false);
const style = computed(() => (dropping.value ? 'image-dropzone__overlay-active' : 'image-dropzone__overlay'));

function readCsv(file) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    emit('drop:csv', reader.result.split(','));
  };
}

function readDataUrl(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    emit('drop:data-url', reader.result);
  };
}

function readFile(file) {
  if (file.type === 'text/csv') {
    readCsv(file);
    return;
  }
  if (file.type.match('image.*')) {
    readDataUrl(file);
    return;
  }
  console.warn('file is not an image', file);
}

function dragging(isDragging) {
  dropping.value = isDragging;
}

function getImages(event) {
  const { files } = event.dataTransfer;
  if (files.length > 0) {
    Array.from(files).forEach(readFile);
    return;
  }
  const url = event.dataTransfer.getData('text/plain');
  if (!url) {
    console.warn('Unable to get dropped image url', event.dataTransfer);
    return;
  }
  emit('drop:url', url);
}

function handleDrop(event) {
  dragging(false);
  getImages(event);
}

</script>

<template>
  <div
       class="image-dropzone__wrapper"
       @drop.prevent="handleDrop"
       @dragenter="dragging(true)"
       @dragleave="dragging(false)"
       @dragover.prevent="dragging(true)">
      <slot>
          <span class="default-image-dropzone">Drop an image here</span>
      </slot>
    <div>
      <div :class="style"><span v-if="showPrompt">
              <font-awesome-icon class='images-icon' :icon="faImages"></font-awesome-icon>
        Drag images here</span></div>
    </div>
  </div>
</template>

<style scoped>

.default-image-dropzone {
  display: block;
  background: white;
  color: black;
  border: 2px dashed #ccc;
}

.image-dropzone__wrapper {
  position: relative;
  z-index: 0;
  min-height: 100%;
}

.images-icon {
  color: white;
}

.image-dropzone__overlay-active,
.image-dropzone__overlay {
  position: absolute;
  padding: 3rem;
  display: grid;
  place-items: center;
  opacity: 50%;
  top: 0;
  left: 0;
  right: 0;
  font-size: clamp(1rem, 3vw, 300%);
  bottom: 0;
  pointer-events: none;
  height: 100%;
  color: var(--color-tertiary)
}

.image-dropzone__overlay-active {
  outline: var(--color-accent) dashed 3px;
  background: var(--color-primary);
  opacity: 100%;
  z-index: 2;
}

.image-dropzone__overlay {
  z-index: 0;
}

</style>
