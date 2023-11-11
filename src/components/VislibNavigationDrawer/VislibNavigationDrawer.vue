<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useVModel} from '@vueuse/core';
import {provide, ref, shallowRef} from 'vue';
import {faGears, faImages} from '@fortawesome/free-solid-svg-icons';
import AlbumDrawer from './AlbumDrawer.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
})

const navCategories = ref([
  {
    title: 'Albums',
    icon: faImages,
    drawer: shallowRef(AlbumDrawer)
  },
  {
    title: 'Settings',
    icon: faGears,
    drawer: null
  }
]);

const selectedCategory = ref(navCategories.value[0]);
const showDrawer = useVModel(props, 'modelValue');

function showCategory(category) {
  if (category.drawer === null) {
    return;
  }

  if (selectedCategory.value === category) {
    showDrawer.value = !showDrawer.value;
    return;
  }

  selectedCategory.value = category;
  showDrawer.value = true;
}

provide('albums', [
  {
    title: 'My Images',
    images: [
      'https://picsum.photos/seed/1/256/256',
      'https://picsum.photos/seed/2/256/256',
      'https://picsum.photos/seed/3/256/256',
      'https://picsum.photos/seed/4/256/256',
      'https://picsum.photos/seed/5/256/256',
      'https://picsum.photos/seed/6/256/256',
      'https://picsum.photos/seed/7/256/256',
      'https://picsum.photos/seed/8/256/256',
      'https://picsum.photos/seed/9/256/256',
      'https://picsum.photos/seed/10/256/256',
      'https://picsum.photos/seed/11/256/256',
      'https://picsum.photos/seed/12/256/256',
      'https://picsum.photos/seed/13/256/256',
      'https://picsum.photos/seed/14/256/256',
      'https://picsum.photos/seed/15/256/256',
      'https://picsum.photos/seed/16/256/256',
      'https://picsum.photos/seed/17/256/256',
      'https://picsum.photos/seed/18/256/256',
      'https://picsum.photos/seed/19/256/256',
      'https://picsum.photos/seed/20/256/256',
      'https://picsum.photos/seed/21/256/256',
      'https://picsum.photos/seed/22/256/256',
      'https://picsum.photos/seed/23/256/256',
      'https://picsum.photos/seed/24/256/256',
      'https://picsum.photos/seed/25/256/256',
      'https://picsum.photos/seed/26/256/256',
      'https://picsum.photos/seed/27/256/256',
    ]
  }
]);

</script>

<template>
  <nav class="navigation-drawer">
    <ul class="navigation-drawer__categories">
      <li v-for='category of navCategories' :key="category.title" @click="showCategory(category)" class="clickable">
        <FontAwesomeIcon class='navigation-drawer__category-icon' :icon="category.icon"/>
        <span class="navigation-drawer__category-title">{{ category.title }}</span>
      </li>
    </ul>
    <transition name="expand">
      <div class="navigation-drawer__main" v-if="showDrawer">
        <component :is="selectedCategory.drawer"></component>
      </div>
    </transition>
  </nav>
</template>

<style scoped>

.navigation-drawer {
  min-height: 100vh;
  background-color: var(--color-primary);
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: var(--color-black) 0 0 1rem;
}

.navigation-drawer__categories {
  place-self: center;
}

.navigation-drawer__categories > * {
  display: grid;
  justify-content: center;
  cursor: pointer;
  justify-items: center;
  border-radius: 100vh;
  padding: 0.5rem;
  aspect-ratio: 1 / 1;
}

.navigation-drawer__category-icon {
  align-self: end;
}

.navigation-drawer__main {
  min-width: 256px;
  background-color: var(--color-black);
}

@media (max-width: 768px) {
  .navigation-drawer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
}

.expand-enter-active {
  animation: expand 0.3s ease-in-out;
}

.expand-leave-active {
  animation: collapse 0.3s ease-in-out;
}

@keyframes expand {
  0% {
    width: 0;
  }
  100% {
    width: 256px;
  }
}

@keyframes collapse {
  0% {
    width: 256px;
  }
  100% {
    width: 0;
  }
}

</style>
