<template>
  <button class="action-button" @click="handleClick" :class="{accented: accent}">
    <FontAwesomeIcon class="action-button__icon" :icon="icon" v-if="icon" />
    <slot>
      <span>{{ text }}</span>
    </slot>
  </button>
</template>

<script setup>
import { defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Define props with type and default values
defineProps({
  icon: Object,
  text: String,
  accent: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);

// You can add a ref to handle internal states if necessary
// const internalState = ref(null);

const handleClick = () => {
  // Emit a custom event when the button is clicked
  // You can pass relevant data as a payload if needed
  emits('click');
};
</script>

<style>
.action-button {
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  background-color: var(--color-neutral);
  color: var(--color-accent);
  gap: 1rem;
}

.action-button__icon {
  margin: auto 0;
  max-height: 1.5rem;
}

.accented {
  background-color: var(--color-accent);
  color: var(--color-neutral);
}

</style>
