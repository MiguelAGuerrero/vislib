<script setup>

import { ref, onBeforeMount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCheck, faExclamation, faEllipsis, faPaste,
} from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['paste']);

const LoadStatus = {
  IDLE: {
    icon: faPaste,
    placeholder: 'Paste an image or image link here',
    class: 'paste-box',
  },
  LOADING: {
    icon: faEllipsis,
    placeholder: 'Image is loading',
    class: '',
  },
  SUCCESS: {
    icon: faCheck,
    placeholder: 'Image loaded successfully',
    class: 'paste-box--success',
  },
  FAILED: {
    icon: faExclamation,
    placeholder: 'Failed to load image: pasted an invalid image link',
    class: 'paste-box--failure',
  },
};

const pasteStatus = ref({});

onBeforeMount(() => {
  pasteStatus.value = LoadStatus.IDLE;
});

async function loadImage(imageUrl) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageUrl;
    image.onerror = () => { resolve(null); };
    image.onload = () => { resolve(image); };
  });
}

async function isValidImage(imageUrl) {
  const loaded = await loadImage(imageUrl);
  return !!loaded;
}

async function emitPastedImage(imageItem) {
  // Check if the clipboard data contains an image
  const imageData = imageItem.getAsFile();
  const imageUrl = URL.createObjectURL(imageData);
  emit('paste', imageUrl);
}

async function emitPastedImageLink(pastedData) {
  if (await isValidImage(pastedData)) {
    emit('paste', pastedData);
  } else {
    throw new Error('Invalid image link');
  }
}

async function handlePaste(event) {
  event.preventDefault();
  pasteStatus.value = LoadStatus.LOADING;
  const { clipboardData } = event;
  try {
    const imageItem = Array.from(clipboardData.items)
      .find((item) => item.type.indexOf('image') !== -1);
    if (imageItem) {
      await emitPastedImage(imageItem);
    } else {
      const pastedData = clipboardData.getData('text');
      await emitPastedImageLink(pastedData);
    }
  } catch (error) {
    console.error('error on paste', error);
    pasteStatus.value = LoadStatus.FAILED;
    return;
  }
  pasteStatus.value = LoadStatus.SUCCESS;
}

</script>

<template>
  <div class="paste-box-container">
    <div class="paste-box__status-indicator-container" v-if="pasteStatus !== LoadStatus.IDLE">
      <font-awesome-icon
          class="paste-box__status-indicator"
          :icon="pasteStatus.icon"></font-awesome-icon>
    </div>
    <input :class="pasteStatus.class"
           type="text"
           :placeholder="pasteStatus.placeholder"
           @paste="handlePaste"
           @focus="pasteStatus = LoadStatus.IDLE"
    />
  </div>
  </template>

<style scoped>

.paste-box-container {
  --color-success: green;
  --color-failure: red;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  overflow: hidden;
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
}

.paste-box > input {
  border: none;
  height: 100%;
  border-bottom-right-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background-color: transparent;
}

.paste-box::placeholder,
.paste-box--success::placeholder,
.paste-box--failure::placeholder{
  font-size: 1rem;
  color: var(--color-white);
  opacity: 80%;
  text-align: center;
  white-space: pre-wrap;
}

.paste-box--success,
.paste-box--failure {
  --outline-width: 3px;
  outline-width: var(--outline-width);
  outline-style: solid;
  outline-offset: calc(var(--outline-width) * -1);
}

.paste-box--success {
  outline-color: var(--color-success);
}

.paste-box--failure {
  outline-color: var(--color-failure);
}

.paste-box__status-indicator-container {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1rem;
}

.paste-box__status-indicator {
  color: var(--color-accent);
  width: 2rem;
  height: 2rem;
  transform: translateX(2px);
}

</style>
