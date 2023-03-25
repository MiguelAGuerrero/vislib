<script setup>
</script>

<template>
  <div class="time-input">
    <label for="time-input"></label>
    <input type="text" id="time-input" name="time" pattern="[0-5][0-9]:[0-5][0-9]" required>
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
  margin: 0;
  border-style: none;
  background: none;
}

</style>
