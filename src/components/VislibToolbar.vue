<script setup>
import {faClipboard, faPlay, faSave, faUpload} from '@fortawesome/free-solid-svg-icons';
import VislibToolbarItem from './VislibToolbarItem.vue';
const emit = defineEmits(['start', 'paste', 'upload', 'save']);
</script>

<template>
  <div role="toolbar" class="toolbar">
    <VislibToolbarItem :icon="faSave" @click="emit('save')">Save Session</VislibToolbarItem>
    <VislibToolbarItem :icon="faClipboard" @click="emit('paste')">Paste Images</VislibToolbarItem>
    <VislibToolbarItem :icon="faUpload" @click="emit('upload')">Upload Images</VislibToolbarItem>
    <VislibToolbarItem :icon="faPlay" @click="emit('start')">Start Session</VislibToolbarItem>
  </div>
</template>

<style scoped>

.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-weight: bold;
  padding: 0.5rem;
  gap: 0.5rem;
}

.toolbar > * {
  background-color: transparent;
  color: var(--color-accent);
}

.toolbar > *:nth-last-child(1) {
  color : var(--color-primary);
  background-color: var(--color-accent);
}

</style>
