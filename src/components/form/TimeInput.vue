<script setup>
import { ref } from 'vue';

const digits = ref(['1', '00']);
const placeholder = '--';

</script>

<template>
  <div class="time-input">
    <input class="time-input__minutes"
           type="text"
           :placeholder="placeholder"
           v-model="digits[0]"
           maxlength="2"/>
    <div class="time-input__separator">:</div>
    <input type="text" :placeholder="placeholder" v-model="digits[1]" maxlength="2"/>
  </div>
</template>

<style scoped>
.time-input {
  display: flex;
  place-items: center;
  padding: 0 0.2rem;
}

input {
  min-height: 1rem;
  min-width: 1rem;
  width: 4ch;
  margin: 0;
  border-style: none;
  background: none;
}

.time-input__minutes {
  text-align: end;
}

.time-input__separator {
  background: none;
}

</style>
