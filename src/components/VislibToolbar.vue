<script setup>
</script>

<template>
  <div role="toolbar" class="toolbar">
    <slot></slot>
  </div>
</template>

<style scoped>

.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-weight: bold;
  padding: 0.5rem;
  gap: 0.5rem;
}

.toolbar > * {
  background-color: transparent;
  color: var(--color-accent);
}

.toolbar > *:nth-last-child(1) {
  color : var(--color-primary);
  background-color: var(--color-accent);
}

</style>
