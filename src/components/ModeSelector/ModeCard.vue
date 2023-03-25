<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

defineProps({
  icon: {
    type: Object,
    default() {
      return {};
    },
  },
  title: {
    type: String,
    default: '',
  },
});

// emit an event when the card is clicked
const emit = defineEmits(['select']);

</script>

<template>
  <label class="card pointer clickable">
    <input class="hidden" type="radio" hidden name="mode" @click.stop="emit('select')" />
    <FontAwesomeIcon class="card__image" :icon="icon" />
    <div class="card__content">
      <h2 v-if="title" class="card__title">{{ title }}</h2>
      <slot></slot>
      <FontAwesomeIcon class='display-on-check' :icon="faCircleCheck"></FontAwesomeIcon>
    </div>
  </label>
</template>

<style scoped>

.card {
  background-color: var(--color-neutral);
  outline: var(--color-secondary) solid 4px;
  border-radius: var(--border-radius);
  padding: 2rem;
  display: grid;
  grid-template: 1fr 1fr / 1fr;
  position: relative;
  gap: 1rem;
  color: var(--color-tertiary);
}

.card__image {
  max-width: 10rem;
  height: auto;
  place-self: center;
  color: var(--color-tertiary);
}

.card__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.hidden {
  position: absolute;
  width: 100%;
  height: 100%;
}

.card:has(input[type=radio]:checked) {
  outline: var(--color-accent) solid 3px;
}

.display-on-check {
  visibility: hidden;
  justify-self: center;
  height: 2rem;
}

input[type=radio]:checked ~ .card__content > .display-on-check {
  visibility: visible;
}

</style>
