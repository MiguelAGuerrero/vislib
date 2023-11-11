<script setup>
import { computed, onMounted, ref, watch } from 'vue';

// Components
import { faFileImport, faGear, faPlay } from '@fortawesome/free-solid-svg-icons';
import PracticeSession from './components/PracticeSession/PracticeSession.vue';
import VislibToolbar from './components/VislibToolbar.vue';
import VislibToolbarItem from './components/VislibToolbarItem.vue';
import VislibTabs from './components/VisualLibrary/VislibTabs/VislibTabs.vue';
import VisualLibrary from './components/VisualLibrary';
import useImageInput from './composables/useImageInput.js';
import VislibOverlay from './components/VislibOverlay.vue';
import ModeSelector from './components/ModeSelector/ModeSelector.vue';
import VislibNavigationDrawer from './components/VislibNavigationDrawer';

const LOCAL_STORAGE_KEY = 'referenceDrawingImages';
const defaultImages = ref([
    'https://source.unsplash.com/random/?hand',
    'https://source.unsplash.com/random/?eye',
    'https://source.unsplash.com/random/?pose'
]);

const running = ref(false);
const showOverlay = ref(false);

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

const showDrawer = ref(false);

function start() {
  if (selectedImages.value.length === 0) return;
  // Open settings dialog
  showOverlay.value = true;
}

function addImages(added) {
  getSelectedTab().images.push(...added);
}

const {images: importedImages, input: importImages} = useImageInput();

watch(importedImages, (value) => {
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

function setImages(images) {
  tabs.value[selectedTab].images = images;
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
    <VislibNavigationDrawer v-model="showDrawer" @selectAlbum="(album) => setImages(album.images)"/>
    <main class="main-content">
      <VislibTabs :tabs="tabs"
                  v-model:tabs="tabs"
                  v-model:active-tab="selectedTab" />
      <VislibToolbar>
        <VislibToolbarItem :icon="faFileImport" @click="importImages">Import Images</VislibToolbarItem>
        <VislibToolbarItem :icon="faGear" @click="showOverlay = true">Settings</VislibToolbarItem>
        <VislibToolbarItem accent :icon="faPlay" @click="start">Start Session</VislibToolbarItem>
      </VislibToolbar>
      <template v-if="!running">
        <div>
          <VisualLibrary
              :images="selectedImages"
              @add="addImages"
              @remove="removeImages"
          />
        </div>
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
    <VislibOverlay v-model="showOverlay">
      <ModeSelector v-model="selectedMode"></ModeSelector>
    </VislibOverlay>
  </div>
</template>

<style scoped>

.app-container {
  position: relative;
  display: flex;
}

.main-content {
  flex-grow: 1;
}

</style>
