<template>
  <div class="mode-selection even-grow">
    <div class="mode-card"
         :class="{ 'selected': selectedMode === mode }"
         v-for="mode in modes"
         :key="mode.name"
         @click="handleCardClick(mode)">
      <div class="mode-card-icon">
        <FontAwesomeIcon :icon="mode.icon"/>
      </div>
      <h3 class="mode-card-title">{{ mode.name }}</h3>
      <p class="mode-card-description">{{ mode.description }}</p>
      <div class="mode-card-check">
        <FontAwesomeIcon :icon="faCheckCircle"
                           :style='showCheck(mode)'/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faStopwatch, faBookOpen, faGears, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

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
    description: 'Quick 1-minute intervals. Good for practicing gestures drawings or quick sketches',
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

const selectedMode = ref(props.modelValue);

const handleCardClick = (mode) => {
  selectedMode.value = mode;
  emit('update:modelValue', mode.name.toLowerCase());
};

const showCheck = (mode) => ({
  visibility: mode.name.toLowerCase() === props.modelValue ? 'visible' : 'hidden',
});

</script>

<style scoped>

.mode-selection {
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--color-tertiary);
  gap: 2rem;
}

@media (max-width: 768px) {
  .mode-selection {
    flex-direction: column;
    height: min-content;
  }
}

.mode-card {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 1rem;
  border: 0.063rem solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.mode-card.selected {
  box-shadow: 0 0 2px 2px var(--color-accent);
}

.mode-card:hover {
  box-shadow: 0 0 2px 2px var(--color-tertiary);
}

.mode-card-icon {
  font-size: 5rem;
}

.mode-card-title {
  font-weight: bold;
}

.mode-card-description {
  flex-grow: 1;
}

.mode-card-check {
  text-align: center;
  font-size: 2rem;
}

</style>
