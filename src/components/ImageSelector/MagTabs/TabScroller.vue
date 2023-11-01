<template>
  <div role="button" class="scroller" @click="handleClick">
    <FontAwesomeIcon :icon="icon"/>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'right',
  },
});

const emit = defineEmits(['click']);

const icon = computed(() => {
  if (props.direction === 'right') {
    return faChevronRight;
  }
  return faChevronLeft;
});

function handleClick() {
  const SCROLL_AMOUNT = 200;
  const amount = SCROLL_AMOUNT * ((props.direction === 'right') ? 1 : -1);
  emit('click', amount);
}

</script>
<style scoped>

.scroller {
  color: var(--color-accent);
  max-width: 2rem;
  display: grid;
  place-content: center;
  padding: 0 1rem;
}
</style>
