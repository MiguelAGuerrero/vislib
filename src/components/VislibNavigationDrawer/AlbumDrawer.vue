<script setup>
import {inject} from 'vue';

const albums = inject('albums');
const emit = defineEmits(['selectAlbum']);

function selectAlbum(album) {
  emit('selectAlbum', album);
}

</script>

<template>
  <div class="album-drawer">
    <button class="album-drawer__create-album-button">Create Album</button>
    <ul>
      <li v-for='album of albums' class="album-drawer__list-item clickable" :key="album.title" @click="selectAlbum(album)">
        {{album.title}} ({{album.images.length}})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.album-drawer {
  display: grid;
  grid-auto-flow: row;
  padding: 1rem;
  gap: 1rem;
}

.album-drawer__list-item {
  list-style: none;
  padding: 1rem;
  text-align: center;
}

</style>
