<script setup>
import { computed, onMounted, ref } from 'vue';
import SlideShow from './PracticeSession/SlideShow.vue';
import ImageSelector from './ImageSelector/ImageSelector.vue';
import MagTabs from './ImageSelector/MagTabs.vue';
import Settings from './PracticeSession/SessionSettings.vue';

const LOCAL_STORAGE_KEY = 'referenceDrawingImages';
const defaultImages = ref([
  'https://th.bing.com/th/id/OIP.VOvY_Xwrx3OCej1WH4-k6AHaHa?pid=ImgDet&rs=1',
  'https://th.bing.com/th/id/OIP.IgytcNrj3cY-40v-uZfCOAHaE8?pid=ImgDet&rs=1',
  'https://www.9jardi.com/wp-content/uploads/2019/12/da.jpg',
]);

const running = ref(false);

// Settings
const transitionDelay = ref(0);
const autoTransition = ref(true);
const loop = ref(false);
const interval = ref(60);
const shuffle = ref(false);

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
      <settings/>
      <button class='start' @click='start'>Start</button>
    </span>
    <span class="right-sidebar">Right sidebar</span>
    <span class="footer">Footer</span>
  </div>
  <SlideShow v-if='running'
             :images='selectedImages'
             :transition-delay='transitionDelay'
             :loop='loop'
             :shuffle='shuffle'
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

/* 3. Actions */
.start {
  margin-top: auto;
  color: var(--color-black);
}

</style>
