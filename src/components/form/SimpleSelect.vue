<script setup>

defineProps({
  modelValue: {
    type: [String, Number],
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(['update:modelValue']);
function handleChange(event) {
  console.log(event.target.value);
  emit('update:modelValue', event.target.value);
}

</script>

<template>
  <select @change='handleChange'>
    <option v-for="option of options"
            :selected="option === modelValue"
            :value="option"
            :key="option">{{ option }}
    </option>
  </select>
</template>

<style scoped>
select {
  max-width: 100%;
  max-height: 100%;
}
</style>
