<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';

import { nextTick, onMounted, ref } from 'vue';
import { useDebounceFn, useEventListener, useMutationObserver } from '@vueuse/core';
import AddTabButton from './AddTabButton.vue';
import TabScroller from './TabScroller.vue';

const props = defineProps({
  tabs: {
    type: Array,
    default() {
      return [];
    },
  },
  activeTab: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:activeTab', 'update:tabs']);
const isOverflowing = ref(false);
const tabsList = ref();

function scrollTabList(amount) {
  tabsList.value.scrollBy({
    left: amount,
    behavior: 'smooth',
  });
}

function checkOverflow() {
  nextTick(() => {
    isOverflowing.value = tabsList.value.scrollWidth > tabsList.value.clientWidth;
  });
}

const CHECK_OVERFLOW_DELAY = 100;

useEventListener('resize', useDebounceFn(checkOverflow, CHECK_OVERFLOW_DELAY));

onMounted(() => {
  useMutationObserver(tabsList.value, checkOverflow, {
    childList: true,
    subtree: true,
  });
});

function getDefaultName(tabs) {
  const name = `tab ${tabs.length + 1}`;
  const duplicateCount = tabs.reduce((accum, current) => accum + (current.name === name), 0);
  if (duplicateCount) {
    return `${name} (${duplicateCount + 1})`;
  }
  return name;
}
function selectTab(index) {
  emit('update:activeTab', index);
}

function removeTab(index) {
  if (props.tabs.length === 1) {
    emit('update:tabs', [{ name: getDefaultName([]), images: [] }]);
    return;
  }
  if (props.tabs.length === 2 || index === props.activeTab) selectTab(index - 1);
  emit('update:tabs', props.tabs.filter((tab, i) => i !== index));
}

function isTabSelected(index) {
  return index === props.activeTab;
}

function addTab() {
  emit('update:tabs', [...props.tabs, { name: getDefaultName(props.tabs), images: [] }]);
  emit('update:activeTab', props.tabs.length);
}

function validateName(index) {
  const tab = props.tabs[index];
  if (tab.name.trim() === '') {
    tab.name = getDefaultName(props.tabs);
  }
}

</script>

<template>
  <div class="tabs-container" @resize="checkOverflow">
    <TabScroller direction="left" v-show="isOverflowing" @click="scrollTabList" />
    <div ref='tabsList' class="tabs-list">
      <span
          v-for='(tab, index) of tabs'
          tabindex="0"
          class="tab hover"
          :key='index'
          :class="{'tab--active': isTabSelected(index)}"
          @click="selectTab(index)"
      >
        <FontAwesomeIcon :icon="faEdit" v-show="isTabSelected(index)" />
        <input v-if="isTabSelected(index)" v-model="tab.name"
               @blur="validateName(index)"
               @click="selectTab(index)"/>
        <span v-else>{{ tab.name }}</span>
        <FontAwesomeIcon class='close-tab' :icon="faClose" @click="removeTab(index)" />
      </span>
      <AddTabButton @click="addTab" v-show="!isOverflowing"/>
    </div>
    <TabScroller direction="right" v-show='isOverflowing' @click="scrollTabList"/>
    <AddTabButton @click="addTab" v-show="isOverflowing" />
  </div>
</template>

<style scoped>

.tabs-container {
  display: grid;
  grid-auto-flow: column;
  border: var(--color-secondary) 1px solid;
  height: min-content;
}

.tabs-list {
  --tab-size: 2rem;
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  overflow: auto;
  grid-auto-flow: column;
  flex-grow: 1;
  max-width: 100%;
}

.tab {
  color: var(--color-accent);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  gap: 0.5rem;
  transition-property: background-color, color, opacity;
  transition-duration: 0.1s;
  white-space: nowrap;
  max-width: 25ch;
  flex: 1;
}

.hover:hover {
  background: var(--color-tertiary);
  color: var(--color-neutral);
  opacity: 80%;
}

.tab:hover input {
  color: var(--color-neutral);
}

.tab input {
  border: none;
  color: var(--color-accent);
  position: relative;
  font-size: 1rem;
  width: 100%;
}

.tab:not(.tab--active) input {
  background: none;
}

.close-tab {
  align-self: center;
  background: transparent;
}

.close-tab {
  display: flex;
  place-content: center;
  place-items: center;
  cursor: pointer;
  aspect-ratio: 1/1;
}

.close-tab:hover {
  background-color: var(--color-tertiary);
  border-radius: var(--border-radius);
  color: var(--color-black);
}

.tab--active {
  opacity: 100%;
  background-color: var(--color-tertiary);
  color: var(--color-primary);
  min-width: 30ch;
}

.tab--active:hover input {
  outline: var(--color-secondary) solid 2px;
  color: var(--color-accent);
}

.tab--active input {
  background-color: var(--color-secondary);
  padding-left: 0.5rem;
}

</style>
