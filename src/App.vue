<script setup>
import {computed, onMounted, ref, watch} from 'vue';

// Components
import { faPlay, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import SessionSettings from './components/SessionSettings.vue';
import ModeSelector from './components/ModeSelector/ModeSelector.vue';
import PracticeSession from './components/PracticeSession/PracticeSession.vue';
import VislibToolbar from './components/VislibToolbar.vue';
import VislibToolbarItem from './components/VislibToolbarItem.vue';
import VislibTabs from './components/VisualLibrary/VislibTabs/VislibTabs.vue';
import VisualLibrary from './components/VisualLibrary/VisualLibrary.vue';
import useImageInput from './composables/useImageInput.js';

const LOCAL_STORAGE_KEY = 'referenceDrawingImages';
const defaultImages = ref([
    'https://source.unsplash.com/random/?hand',
    'https://source.unsplash.com/random/?eye',
    'https://source.unsplash.com/random/?pose'
]);

const running = ref(false);

// Settings
const customSettings = ref({
  transitionDelay: 5,
  autoTransition: true,
  loop: false,
  interval: 60,
  shuffle: false,
});

const tabs = ref([
  { name: 'tab 1', images: defaultImages },
]);

const images = computed(() => tabs.value.reduce((accum, tab) => [...accum, ...tab.images], []));
const selectedTab = ref(0);

function getSelectedTab() {
  return tabs.value[selectedTab.value] || tabs.value[0];
}

const selectedImages = computed(() => getSelectedTab().images || []);

// An enum of the different modes
const modes = {
  sketch: 'sketch',
  study: 'study',
  custom: 'custom',
};

// An object mapping the mode to the component to use to an object representing settings
const modeSettings = {
  [modes.sketch]: {
    settings: {
      transitionDelay: 5,
      autoTransition: true,
      loop: false,
      interval: 60,
      shuffle: false,
    },
  },
  [modes.study]: {
    settings: {
      transitionDelay: 10,
      autoTransition: true,
      loop: false,
      interval: 60 * 5,
      shuffle: false,
    },
  },
  [modes.custom]: {
    settings: ref(customSettings),
  },
};

const selectedMode = ref('sketch');
const selectedModeSettings = computed(
  () => modeSettings[selectedMode.value.toLowerCase()].settings,
);

function saveImages() {
  if (images.value.length === 0) return;
  const fileData = images.value.join(',');
  const blob = new Blob([fileData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'images.csv';
  link.click();
  window.URL.revokeObjectURL(url);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images.value));
}

function start() {
  if (selectedImages.value.length === 0) return;
  running.value = true;
}

function addImages(added) {
  getSelectedTab().images.push(...added);
}

const {images: uploadedImages, input: uploadImages} = useImageInput();

watch(uploadedImages, (value) => {
  if (value.length === 0) return;
  addImages(value);
});

function removeImages(removed) {
  const s = getSelectedTab();
  // TODO: Make sure to revoke object URLs
  s.images = s.images.filter((image) => !removed.includes(image));
}

function selectTab(index) {
  if (!tabs.value.length < index) selectedTab.value = index;
  else selectTab.value = tabs.value.length - 1;
}

function setImages(incoming) {
  tabs.value[selectedTab].images = incoming;
}

onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (!storedData || storedData.length === 0) return;
  selectTab(0);
  setImages(storedData);
});


</script>

<template>
  <div class='app-container'>
      <VislibTabs :tabs="tabs"
                class="image-selector__tabs"
                v-model:tabs="tabs"
                v-model:active-tab="selectedTab" />
     <VislibToolbar>
       <VislibToolbarItem :icon="faSave" @click='saveImages'>Save URLs</VislibToolbarItem>
       <VislibToolbarItem :icon="faUpload" @click="uploadImages">Upload Images</VislibToolbarItem>
       <VislibToolbarItem accent :icon="faPlay" @click="start">Start Session</VislibToolbarItem>
     </VislibToolbar>
    <main class="main-content">
      <template v-if="!running">
        <div class="image-selector-container">
          <VisualLibrary
              class="image-selector"
              :images="selectedImages"
              @add="addImages"
          />
        </div>
<!--      <div class="setting-options">
        <mode-selector v-model="selectedMode" />
      </div>
      <session-settings :settings="customSettings" v-show="selectedMode === modes.custom"/>-->
      </template>
      <practice-session v-if='running'
                        :images='selectedImages'
                        :transition-delay='selectedModeSettings.transitionDelay'
                        :loop='selectedModeSettings.loop'
                        :shuffle='selectedModeSettings.shuffle'
                        :auto='selectedModeSettings.autoTransition'
                        :interval='selectedModeSettings.interval'
                        @done='running = false'/>
    </main>
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  grid-column: 2 / 3;
  display: grid;
  grid-template: 1fr / 1fr;
  flex-grow: 1;
  color: var(--color-tertiary);
}

/* Components */
/* 1. Image Selector */
.image-selector-container {
  display: grid;
}

.image-selector {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.image-selector__tabs {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

</style>
