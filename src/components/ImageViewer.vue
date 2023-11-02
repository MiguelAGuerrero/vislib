<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  src: String,
  aspectRatio: {
    type: String,
    default: '1 / 1',
  },
  size: {
    type: Number,
    default: 200,
  },
});

const style = computed(() => ({
  width: `${props.size}px`,
  'aspect-ratio': props.aspectRatio,
}));

const image = ref();
const imageNotFound = ref(false);

onMounted(() => {
  image.value.onerror = () => { imageNotFound.value = true; };
  image.value.onload = () => { imageNotFound.value = false; };
});

function handleSelect() {
  imageNotFound.value = true;
}

</script>

<template>
  <div class='image-viewer-container' :style="style">
    <div class='image-not-found' v-if="imageNotFound">
      <div>"{{src}}"</div>
      IMAGE NOT FOUND
    </div>
    <img
      v-else
      ref='image'
      loading="lazy"
      draggable="false"
      alt='reference image'
      :src="src"
      @select="handleSelect" />
  </div>
</template>

<style scoped>

.image-viewer-container {
  border-radius: var(--border-radius);
}

.image-not-found {
  margin: auto 0;
  padding: 1rem;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

</style>
