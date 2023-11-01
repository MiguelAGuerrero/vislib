<script setup>
import { computed, onMounted, ref } from 'vue';

// Components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ImageSelector from './components/ImageSelector/ImageSelector.vue';
import MagTabs from './components/ImageSelector/MagTabs/MagTabs.vue';
import SessionSettings from './components/SessionSettings.vue';
import ModeSelector from './components/ModeSelector/ModeSelector.vue';
import PracticeSession from './components/PracticeSession/PracticeSession.vue';

const LOCAL_STORAGE_KEY = 'referenceDrawingImages';
const defaultImages = ref([
  'https://th.bing.com/th/id/OIP.VOvY_Xwrx3OCej1WH4-k6AHaHa?pid=ImgDet&rs=1',
  'https://th.bing.com/th/id/OIP.IgytcNrj3cY-40v-uZfCOAHaE8?pid=ImgDet&rs=1',
  'https://www.9jardi.com/wp-content/uploads/2019/12/da.jpg',
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

// eslint-disable-next-line no-unused-vars
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
    <span class="header">My Drawing Session</span>
    <span class="left-sidebar">Left sidebar</span>
    <span class="main-content">
      <template v-if="!running">
        <div class="image-selector-container">
          <mag-tabs :tabs="tabs"
                    class="image-selector__tabs"
                    v-model:tabs="tabs"
                    v-model:active-tab="selectedTab" />
          <image-selector
              class="image-selector"
              :images="selectedImages"
              @add="addImages"
              @remove="removeImages" />
        </div>
      <div class="setting-options">
        <mode-selector v-model="selectedMode" />
      </div>
      <session-settings :settings="customSettings" v-show="selectedMode === modes.custom"/>
      <span class="start-button">
        <FontAwesomeIcon class='start-button__icon' :icon="faPlay"></FontAwesomeIcon>
        <button class='start' @click='start'>Start</button>
      </span>
      </template>
      <practice-session v-if='running'
                        :images='selectedImages'
                        :transition-delay='selectedModeSettings.transitionDelay'
                        :loop='selectedModeSettings.loop'
                        :shuffle='selectedModeSettings.shuffle'
                        :auto='selectedModeSettings.autoTransition'
                        :interval='selectedModeSettings.interval'
                        @done='running = false'/>
    </span>
    <span class="right-sidebar">Right sidebar</span>
    <span class="footer">Footer</span>
  </div>
</template>

<style scoped>

.app-container {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto; /*Holy grail layout*/
}

.header {
  display: none;
  grid-column: 1 / 4;
  background-color: var(--color-secondary);
  padding: 1rem;
}

.left-sidebar {
  grid-column:  1 / 2;
  display: none;
}

.main-content {
  grid-column: 2 / 3;
  display: grid;
  grid-template: 1fr auto auto / 1fr;
  min-height: 50dvh;
  gap: 3rem;
  max-width: 1280px;
  color: var(--color-tertiary);
  margin: 0 auto;
}

.right-sidebar {
  grid-column: 3 / 4;
  display: none;
}

.footer {
  display: none;
  grid-column: 1 / 4;
}

/* Components */
/* 1. Image Selector */
.image-selector-container {
  display: grid;
  max-width: 1280px;
}

.image-selector {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.image-selector__tabs {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

/* 3. Actions */
.start-button {
  display: grid;
  grid-template-columns: auto 1fr;
  margin-top: auto;
  color: var(--color-accent);
  align-items: center;
  background-color: var(--color-accent);
  border-radius: var(--border-radius);
}

.start-button__icon {
  height: 2rem;
  color: var(--color-secondary);
  padding-left: 1rem;
}
/* End Components */

</style>
