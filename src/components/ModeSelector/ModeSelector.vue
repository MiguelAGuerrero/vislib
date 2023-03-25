<script setup>
import ModeCard from './ModeCard.vue';

const emit = defineEmits(['update:modelValue']);

// model prop is a string that is the name of the mode
defineProps({
  modelValue: {
    type: String,
    default: 'Study',
  },
});

// function that emits a model update event with the name of the mode selected
function updateModel(mode) {
  console.log('update model', mode);
  emit('update:modelValue', mode);
}

// A list of objects with a title and description for each mode card
const modes = [
  {
    name: 'Sketch',
    description: 'Quick 1-minute intervals. Good for practicing gestures drawings or quick sketches',
  },
  {
    name: 'Study',
    description: 'Move at your own pace.',
  },
  {
    name: 'Custom',
    description: 'Define your own settings',
  },
];

</script>

<template>
  <h1>Choose a mode</h1>
  <div class="flex small-gap even-grow">
    <mode-card
        v-for="mode in modes"
        :key="mode.name"
        :title="mode.name"
        @select="updateModel(mode.name.toLowerCase())"
    >
      {{ mode.description }}
    </mode-card>
  </div>
</template>

<style scoped>

</style>
