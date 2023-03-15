<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  src: String,
  aspectRatio: Array,
});

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
  <div class='image-viewer-container'>
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
      :class="$attrs.class"
      @select="handleSelect" />
  </div>
</template>

<style scoped>

.image-not-found {
  margin: auto 0;
  padding: 1rem;
}

.image-viewer-container {
  display: flex;
  place-items: center;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

</style>
