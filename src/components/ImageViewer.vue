<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  src: String,
  aspectRatio: {
    type: String,
    default: '1 / 1',
  },
});

const style = computed(() => ({
  'aspect-ratio': props.aspectRatio,
}));

const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
};

const image = ref();
const imageStatus = ref(Status.LOADING);

function handleImageLoad() {
  imageStatus.value = Status.LOADED;
}

function handleImageError() {
  imageStatus.value = Status.ERROR;
}

</script>

<template>
  <div class='flex centered rounded' :style="style">
    <div class='loading-indicator' v-if="imageStatus === Status.LOADING" >Loading...</div>
    <div class='image-not-found' v-else-if="imageStatus === Status.ERROR">
      <div>"{{src}}"</div>
      IMAGE NOT FOUND
    </div>
    <img
      ref='image'
      loading="lazy"
      draggable="false"
      alt='reference image'
      :src="src"
      @load="handleImageLoad"
      @error="handleImageError"
    />
  </div>
</template>

<style scoped>

.image-not-found {
  margin: auto 0;
  padding: 1rem;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.loading-indicator {
  margin: auto 0;
  text-align: center;
}

.loading-indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 2px);
  border: #cccccc dashed 1px;
}

.hidden {
  display: none;
}

</style>
