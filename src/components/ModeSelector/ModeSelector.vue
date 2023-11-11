<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faStopwatch, faBookOpen, faGears, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import {useVModel} from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const modes = ref([
  {
    name: 'Sketch',
    description: 'Quick 1-minute intervals.',
    icon: faStopwatch,
  },
  {
    name: 'Study',
    description: 'Move at your own pace.',
    icon: faBookOpen,
  },
  {
    name: 'Custom',
    description: 'Define your own settings',
    icon: faGears,
  },
]);

const selectedMode = useVModel(props, 'modelValue');

const handleCardClick = (mode) => {
  selectedMode.value = mode;
  emit('update:modelValue', mode.name.toLowerCase());
};

const showCheck = (mode) => ({
  visibility: mode.name.toLowerCase() === props.modelValue ? 'visible' : 'hidden',
});

</script>

<template>
  <div class="mode-selection even-grow">
    <div class="mode-card"
         v-for="mode in modes"
         :class="{ 'selected': selectedMode === mode }"
         :key="mode.name"
         @click="handleCardClick(mode)">
      <div class="mode-card__icon">
        <FontAwesomeIcon :icon="mode.icon"/>
      </div>
      <section>
        <h3 class="mode-card__title">{{ mode.name }}</h3>
        <p class="mode-card__description">{{ mode.description }}</p>
      </section>
      <div class="mode-card__check">
        <FontAwesomeIcon :icon="faCheckCircle"
                         :style='showCheck(mode)'/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.mode-selection {
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--color-tertiary);
  gap: 1rem;
}

@media (max-width: 768px) {
  .mode-selection {
    flex-direction: column;
    height: min-content;
  }
}

.mode-card {
  display: grid;
  padding: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  background-color: var(--color-white);
  color: var(--color-secondary);
  justify-items: center;
}

.mode-card.selected {
  box-shadow: 0 0 2px 2px var(--color-accent);
}

.mode-card:hover {
  box-shadow: 0 0 2px 2px var(--color-tertiary);
}

.mode-card__icon {
  font-size: clamp(2rem, 5vw, 5rem);
}

.mode-card__title {
  font-weight: bold;
}

.mode-card__description {
  flex-grow: 1;
}

.mode-card-check {
  text-align: center;
  font-size: 2rem;
}


@media (max-width: 768px) {
  .mode-card {
    display: grid;
    grid-template: auto auto / auto 1fr;
    align-items: center;
  }

  .mode-card__icon {
    grid-column-start: 0;
    grid-column-end: 1;
    grid-row-start: 0;
    grid-row-end: 1;
    margin-right: 1rem;
  }

  .mode-card__title {
    font-size: 1rem;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 0;
    grid-row-end: 1;
    margin: 0;
  }

  .mode-card__description {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
}

</style>
