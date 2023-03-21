<template>
  <div class="navigator">
    <button class="nav-button" @click="$emit('click:before')">Before</button>
    <button class="nav-button" @click="$emit('click:next')">Next</button>
  </div>
</template>

<script setup>
defineEmits(['click:before', 'click:next']);
</script>

<style scoped>

.navigator {
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-button {
  flex-basis: 50%
}
</style>
