<script setup>
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <button class="add-button">
    <FontAwesomeIcon class='add-tab' :icon="faAdd" />
  </button>
</template>

<style scoped>
.add-button {
  color: var(--color-white);
  background-color: transparent;
  width: 2rem;
  aspect-ratio: 1;
  padding: 0;
  margin: auto 0;
}
</style>
