<script setup>
import { ref } from 'vue';

const minutesInput = ref();
const secondsInput = ref();
const previousInputValue = ref();
const placeholder = '00';

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

function cleanInput(input) {
  return input.replace(/\D/g, '');
}

const emit = defineEmits(['update:modelValue']);

function updateModelValue() {
  const minutes = minutesInput.value.value;
  const seconds = secondsInput.value.value;
  const SEC_IN_MIN = 60;
  const totalSeconds = Number(minutes) * SEC_IN_MIN + Number(seconds);
  emit('update:modelValue', totalSeconds);
}

function correctInputValue(event) {
  const input = event.target;
  input.value = cleanInput(input.value).padStart(2, '0');
}

function updateModelOnCompleteBlur() {
  const isMinutesInputBlurred = minutesInput.value !== document.activeElement;
  const isSecondsInputBlurred = secondsInput.value !== document.activeElement;
  if (isMinutesInputBlurred && isSecondsInputBlurred) {
    updateModelValue();
  }
}

function restoreInputValue(event) {
  const input = event.target;
  input.value = previousInputValue.value;
}

function processInput(event) {
  const { target } = event;
  if (target.value === '') {
    restoreInputValue(event);
  } else {
    correctInputValue(event);
  }
  updateModelOnCompleteBlur();
}

function autoFocusNextInputOnMaxLength(currentInput, nextInput, maxLength) {
  if (currentInput.value.length !== maxLength) return;
  currentInput.blur();
  nextInput.focus();
}

function handleMinuteInput(event) {
  const input = event.target;
  const sanitized = cleanInput(input.value);
  if (sanitized === input.value) {
    const MAX_INPUT_LENGTH = 2;
    autoFocusNextInputOnMaxLength(input, secondsInput.value, MAX_INPUT_LENGTH);
  }
}

function clearInput(event) {
  const input = event.target;
  input.value = '';
}

function saveValueAndClear(event) {
  const input = event.target;
  previousInputValue.value = input.value;
  clearInput(event);
}

</script>

<template>
  <div class="time-input">
    <span id="minutes" class="time-part">
      <input
          ref="minutesInput"
          name="minutes"
          min="0"
          max="59"
          maxlength="2"
          :placeholder="placeholder"
          @click="saveValueAndClear"
          @input="handleMinuteInput"
          @blur="processInput"
      />
      <label class="small-text" for="minutes">m</label>
    </span>
    <div class="delimiter">:</div>
    <span id="seconds" class="time-part">
      <input
          ref="secondsInput"
          name="seconds"
          min="0"
          max="59"
          maxlength="2"
          :placeholder="placeholder"
          @click="saveValueAndClear"
          @blur="processInput"
      />
      <label class="small-text" for="seconds">s</label>
    </span>
  </div>
</template>

<style scoped>

.time-input {
  display: flex;
  border: var(--color-tertiary) solid 1px;
  padding: 0 0.5rem;
}

.time-part {
  display: flex;
}

.time-part input {
  border: none;
  max-width: 2ch;
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: 1rem;
}

.delimiter {
  padding: 0 0.5rem;
}

label {
  align-self: end;
  padding: 0;
  margin: 0;
  transform: translateY(-2px);
}

</style>
