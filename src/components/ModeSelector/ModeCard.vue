<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

defineProps({
  image: {
    type: String,
    default: '',
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
    <img v-if="image" class="card__image" :src="image" alt="card image"/>
    <h2 v-if="title" class="card__title">{{ title }}</h2>
    <slot></slot>
    <FontAwesomeIcon class='display-on-check' :icon="faCircleCheck"></FontAwesomeIcon>
  </label>
</template>

<style scoped>

.card {
  background-color: var(--color-neutral);
  outline: var(--color-secondary) solid 3px;
  border-radius: var(--border-radius);
  padding: 2rem;
  display: grid;
  grid-template-rows: 1fr auto;
  position: relative;
}

.card__image {
  object-fit: contain;
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
}

input[type=radio]:checked ~ .display-on-check {
  visibility: visible;
}

</style>
