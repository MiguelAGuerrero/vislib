<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons';

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
  return `tab ${tabs.length + 1}`;
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
  if (tab.name.trim() !== '') return;
  emit('update:tabs', [...props.tabs]);
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
        <input v-model="tab.name" :disabled="!isTabSelected(index)" @blur="validateName(index)"/>
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
  gap: 0.5rem;
  flex-wrap: wrap;
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
  padding: 0.5ch;
  background-color: var(--color-secondary);
}

.tab:hover, .add-tab-container:hover {
  background: var(--color-tertiary);
  color: var(--color-neutral);
  opacity: 80%;
}

.tab:hover > input {
  color: var(--color-neutral);
}

.tab > input {
  width: 10ch;
  border: none;
  color: var(--color-accent);
  position: relative;
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
  padding: 0 0.5rem;
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

.tab--active > input {
  color: var(--color-neutral);
}

</style>
