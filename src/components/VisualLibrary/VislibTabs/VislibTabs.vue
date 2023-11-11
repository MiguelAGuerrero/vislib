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
const editing = ref(-1);

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
          class="tab hover"
          :key='index'
          :class="{'tab--active': isTabSelected(index)}"
          :tabindex="index  === activeTab ? 0 : -1"
          @click="selectTab(index)"
      >
        <FontAwesomeIcon class='action-edit' :icon="faEdit" v-show="isTabSelected(index)" @click="editing = index"/>
        <input v-if="isTabSelected(index) && isEditing(index)" v-model="tab.name"
               @blur="validateName(index)"
               @click="selectTab(index)"/>
        <span class="tab__title" v-else>{{ tab.name }}</span>
        <FontAwesomeIcon class='action-close' :icon="faClose" @click="removeTab(index)" />
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
  font-size: 12px;
}

.tabs-list {
  --tab-size: 2rem;
  display: flex;
  overflow: auto;
  grid-auto-flow: column;
  flex-grow: 1;
  max-width: 100%;
}

.tabs-list > *:last-child {
  margin-left: 0.25rem;
}

.tab {
  color: var(--color-accent);
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  gap: 0.5rem;
  transition-property: background-color, color, opacity;
  transition-duration: 0.1s;
  white-space: nowrap;
  max-width: 10rem;
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
  width: 100%;
}

.tab:not(.tab--active) input {
  background: none;
}

.tab__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
}

.action-close {
  aspect-ratio: 1/1;
}

.action-close:hover {
  background-color: var(--color-black);
  color: var(--color-accent);
}

.tab--active {
  opacity: 100%;
  background-color: var(--color-tertiary);
  color: var(--color-primary);
  min-width: 20ch;
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
