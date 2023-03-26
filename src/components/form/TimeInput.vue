<script setup>
const placeholder = '00';

function autoFocusNextInputOnMaxLength(event) {
  const input = event.target;
  if (input.value.length === 2) {
    input.blur();
    document.getElementById('seconds').querySelector('input').focus();
  }
}

function clearInput(event) {
  const input = event.target;
  input.value = '';
}

</script>

<template>
  <div class="time-input">
    <span id="minutes" class="time-part">
      <input name="minutes"
             min="0"
             max="59"
             maxlength="2"
             :placeholder="placeholder"
              @focus="clearInput"
             @input="autoFocusNextInputOnMaxLength"
      />
      <label class="small-text" for="minutes">m</label>
    </span>
    <div class="delimiter">:</div>
    <span id="seconds" class="time-part">
      <input
          name="seconds"
          min="0"
          max="59"
          maxlength="2"
          :placeholder="placeholder"
          @focus="clearInput"
      />
      <label class="small-text" for="seconds">s</label>
    </span>
  </div>
</template>

<style scoped>

.time-input {
  display: flex;
  border: var(--color-tertiary) solid 1px;
  width: fit-content;
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
  transform: translateY(-1px);
}

</style>
