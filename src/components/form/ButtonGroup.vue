<script setup>

const emit = defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: [String, Number, Boolean],
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  label: {
    type: String,
    default: '',
  },
});

function handleClickEvent(event) {
  emit('update:modelValue', event.target.value);
}

</script>
<template>
  <div class="button-group">
    <label v-if="label">{{label}}</label>
    <button
          v-for="option of options"
          :key="option"
          :value='option'
          :style='{optionSelected: modelValue === option}'
          @click="handleClickEvent">
      {{ option }}
    </button>
  </div>
</template>

<style scoped>

.button-group {
  display: flex;
}

button {
  border-radius: 0;
  border-left: var(--color-black) solid  ;
  border-right-style: solid;
  height: min-content;
  color: var(--color-black);
}

button:first-child {
  border-top-left-radius: 100vh;
  border-bottom-left-radius: 100vh;
}

button:last-child {
  border-top-right-radius: 100vh;
  border-bottom-right-radius: 100vh;
}

button:hover {
  opacity: 50%;
}

</style>
