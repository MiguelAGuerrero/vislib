<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faClose, faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';

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
  if (props.tabs.length === 2) selectTab(0);
  else if (index === props.activeTab) selectTab(index - 1);
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
  <div class="tabs-list">
    <span
        :key='index'
        @click="selectTab(index)"
        v-for='(tab, index) of tabs'
        tabindex="0"
        role="button"
        :class="{'tab--active': isTabSelected(index)}"
        class="tab">
      <font-awesome-icon :icon="faEdit" v-show="isTabSelected(index)" />
      <div class="input-container">
        <input v-model="tab.name" :disabled="!isTabSelected(index)" @blur="validateName(index)"/>
      </div>
        <font-awesome-icon class='close-tab' :icon="faClose" @click="removeTab(index)" />
    </span>
    <div class="add-tab-container" @click="addTab">
      <font-awesome-icon class='add-tab' :icon="faAdd" />
    </div>
  </div>
</template>

<style scoped>

.tabs-list {
  --tab-size: 2rem;
  background-color: var(--color-secondary);
  display: flex;
  min-height: var(--tab-size);
  padding: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.add-tab, .tab {
  height: var(--tab-size);
}

.tabs-list > * {
  color: var(--color-accent);
  height: var(--tab-size);
  border-radius: var(--border-radius);
}

.tab {
  display: flex;
  background-color: var(--color-secondary);
  align-items: center;
  padding: 0 0.5rem;
  gap: 0.5rem;
}

.tab:hover, .add-tab-container:hover {
  background: var(--color-tertiary);
  color: var(--color-neutral);
  opacity: 80%;
}

.tab:hover input {
  color: var(--color-neutral);
}

.tab input {
  min-width: 10ch;
  width: fit-content;
  border: none;
  color: var(--color-accent);
  position: relative;
  font-size: 1rem;
}

.tab:not(.tab--active) input {
  background: none;
}

.close-tab {
  align-self: center;
  background: transparent;
}

.add-tab-container, .close-tab {
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
.add-tab {
  height: 1rem;
}

.tab--active {
  opacity: 100%;
  background-color: var(--color-tertiary);
  color: var(--color-primary);
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
