<script setup>

import { ref, onBeforeMount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faExclamation, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['paste']);

const LoadStatus = {
  IDLE: {
    icon: '',
    placeholder: 'Paste an image URL here',
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
    placeholder: 'Image failed to load',
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

async function addPastedImageLink(event) {
  event.preventDefault();
  pasteStatus.value = LoadStatus.LOADING;
  const { clipboardData } = event;
  const pastedData = clipboardData.getData('text');
  if (await isValidImage(pastedData)) {
    pasteStatus.value = LoadStatus.SUCCESS;
    emit('paste', pastedData);
  } else {
    pasteStatus.value = LoadStatus.FAILED;
  }
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
           @paste="addPastedImageLink"
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
}

.paste-box > input {
  border: none;
  height: 100%;
  padding-left: 1rem;
  background-color: transparent;
  border-bottom-right-radius: inherit;
  border-top-right-radius: inherit;
}

.paste-box::placeholder {
  font-size: 1rem;
  color: var(--color-white);
  opacity: 80%
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
  color: var(--color-white);
  height: 1.5rem;
  transform: translateX(2px);
}

</style>
