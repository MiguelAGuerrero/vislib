<script setup>
import {
  computed, onMounted, onUnmounted, ref,
} from 'vue';
import ImageViewer from '../ImageSelector/ImageViewer.vue';
import ImageNavigator from '../ImageSelector/ImageNavigator.vue';
import ViewerTimer from './ViewerTimer.vue';

const props = defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
  transitionDelay: {
    type: Number,
    default() {
      return 0;
    },
  },
  loop: {
    type: Boolean,
    default() {
      return 0;
    },
  },
  auto: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 60,
  },
});

const emit = defineEmits(['done']);
const index = ref(0);
const transitioning = ref(false);
const resetTimer = ref(true);
const pauseTimer = ref(false);

const wrappedImageIndex = computed(() => {
  const count = props.images.length;
  // If the negative index is beyond bounds
  const adjustedOutOfBoundsIndex = (index.value % count);
  // In case we get a negative result from a modulo.
  const withinBoundsIndex = adjustedOutOfBoundsIndex + count;
  // The additional modulo so that a value the size of the array wraps to 0.
  return withinBoundsIndex % count;
});

const selectedImage = computed(() => {
  if (transitioning.value) {
    return 'https://cdn.dribbble.com/users/2869863/screenshots/6047846/comp5.gif';
  }
  return props.images[wrappedImageIndex.value];
});

function endReached(i) {
  return !props.loop && (i === props.images.length || i < 0);
}

function finish() {
  transitioning.value = false;
  emit('done');
}

function changeImage(offset, skipped) {
  if (endReached(index.value + offset)) {
    finish();
    return;
  }
  function changeImageHelper() {
    // Using a prop to trigger the reset feels hacky, but the alternative is to call the
    // reset method in timer directly, which is tight coupling
    resetTimer.value = !resetTimer.value;
    index.value += offset;
    transitioning.value = false;
  }
  if (props.auto && !skipped) {
    transitioning.value = true;
    const MS_IN_SECONDS = 1000;
    setTimeout(changeImageHelper, props.transitionDelay * MS_IN_SECONDS);
    return;
  }
  changeImageHelper();
}

function nextImage(skipped) {
  changeImage(1, skipped);
}

function previousImage(skipped) {
  changeImage(-1, skipped);
}

function handleUserInput(event) {
  event.preventDefault(); // Want to make sure that the key press doesn't trigger something else
  switch (event.key) {
    case 'ArrowRight':
      nextImage();
      break;
    case 'ArrowLeft':
      previousImage();
      break;
    case ' ':
      pauseTimer.value = !pauseTimer.value;
      break;
    default:
      break;
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleUserInput);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleUserInput);
});

</script>

<template>
  <div class="slide-show">
    <div class="slide-show__slide-number">{{wrappedImageIndex + 1}} / {{images.length}}</div>
    <ImageViewer :src="selectedImage"/>
    <ImageNavigator @click:next="nextImage(true)" @click:before="previousImage(true)"/>
    <div>
      <div>Next image in: </div>
      <ViewerTimer
          v-if='!transitioning'
                   :seconds='interval' :pause='pauseTimer'
                   @done="nextImage" :reset='resetTimer'/>
      <ViewerTimer v-else :seconds='transitionDelay' :color="'red'" />
    </div>
    <button @click="finish">Finish</button>
  </div>
</template>

<style scoped>

.slide-show {
  display: grid;
  position: relative;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  max-height: 95vh;
  height: 100%;
  gap: 1rem;
}

.slide-show__slide-number {
  text-align: center;
  font-size: 1.5rem;
}

</style>
