<script setup>
import { computed, onMounted, ref } from 'vue';
import SlideShow from './components/SlideShow.vue';
import ImageSelector from './components/ImageSelector.vue';
import MagTabs from './components/MagTabs.vue';

const LOCAL_STORAGE_KEY = 'referenceDrawingImages';
const defaultImages = ref([
  'https://th.bing.com/th/id/OIP.VOvY_Xwrx3OCej1WH4-k6AHaHa?pid=ImgDet&rs=1',
  'https://th.bing.com/th/id/OIP.IgytcNrj3cY-40v-uZfCOAHaE8?pid=ImgDet&rs=1',
  'https://www.9jardi.com/wp-content/uploads/2019/12/da.jpg',
]);

const running = ref(false);
const transitionDelay = ref(0);

const autoTransition = ref(true);
const loop = ref(false);
const interval = ref(60);
const tabs = ref([
  { name: 'tab 1', images: defaultImages },
]);

const images = computed(() => tabs.value.reduce((accum, tab) => [...accum, ...tab.images], []));
const selectedTab = ref(0);

function getSelectedTab() {
  return tabs.value[selectedTab.value] || tabs.value[0];
}

const selectedImages = computed(() => getSelectedTab().images || []);

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
    <span class="header">Header</span>
    <span class="left-sidebar">Left sidebar</span>
    <span class="main-content">
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
      <div class='session-settings'>
        <h1 class="session-settings__title">Settings</h1>
        <div class='session-settings__body'>
          <span class="setting">
            <label id='time-interval-label' for='time-interval'>
              {{interval}}s time interval
            </label>
          </span>
          <span class="setting">
            <label id='auto-progress-label' for='auto-progress'>
              {{ autoTransition ? 'Auto-transition' : 'No auto-transition' }}
              <input id='auto-progress' type='checkbox' v-model='autoTransition' v-show="false">
            </label>
            <span v-if='autoTransition'>
              >
              <label
                  id="transition-delay-label"
                  class='session-settings__label'
                  for="transition-delay">
                {{ transitionDelay === 0 ? '0 Delay' : `${transitionDelay}s delay` }}
              </label>
            </span>
          </span>
          <span class="setting">
`            <label id='loop-label'>
              {{ loop ? 'Looping' : 'No looping'}}
              <input type='checkbox' v-model='loop' v-show='false'/>
            </label>
          </span>
          <span class="setting">
            <label>
              Shuffle
              <input type="checkbox" v-show="false">
            </label>
          </span>
        </div>
      </div>
      <button class='start' @click='start'>Start</button>
    </span>
    <span class="right-sidebar">Right sidebar</span>
    <span class="footer">Footer</span>
  </div>
  <SlideShow v-if='running'
             :images='selectedImages'
             :transition-delay='transitionDelay'
             :loop='loop'
             :auto='autoTransition'
             :interval='interval'
             @done='running = false'/>
</template>

<style scoped>

.app-container {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto; /*Holy grail layout*/
}

.header {
  display: none;
  grid-column: 1 / 4;
  background-color: var(--color-tertiary);
  padding: 1rem;
}

.left-sidebar {
  grid-column:  1 / 2;
  display: none;
}

.main-content {
  grid-column: 2 / 3;
  display: grid;
  grid-template: 1fr auto / 1fr;
  align-content: center;
  margin: 0 auto;
  border-radius: 1rem;
  min-height: 90vh;
  gap: 3rem;
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
  grid-template: auto 1fr / 1fr;
  max-height: 80vh;
  width: 80vw;
}

.image-selector {
  position: relative;
  flex-basis: 100%;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.image-selector__tabs {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

/* 2. Settings */
.session-settings {
  display: grid;
  grid-template: 1fr / 1fr;
  border-radius: var(--border-radius);
  gap: 1rem;
}

.session-settings__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.setting {
  cursor: pointer;
  position: relative;
  background-color: var(--color-black);
}

.setting + .setting {
  border-left: var(--color-white) solid 2px;
  padding-left: 1rem;
}

.setting:first-child {
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}

.setting-icon {
  width: 100%;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
}

.conditional-setting {
  display: grid;
  grid-template: 1fr / auto 1fr auto 1fr;
}

.session-settings__body > :not(label){
  text-align: left;
}

.session-settings label + * {
  justify-self: left;
}

/* 3. Actions */
.start {
  margin-top: auto;
  color: var(--color-black);
}

</style>
