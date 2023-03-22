<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

defineProps({
  settings: {
    type: Object,
    required: true,
    default() {
      return {
        autoTransition: true,
        transitionDelay: false,
        interval: 60,
        loop: false,
        shuffle: false,
      };
    },
  },
});

</script>

<template>
  <div class='session-settings'>
    <h1 class="session-settings__title">
      <font-awesome-icon :icon="faGear"></font-awesome-icon>
      Settings
    </h1>
    <div class='session-settings__body'>
          <span class="setting">
            <label id='time-interval-label' for='time-interval'>
              Time interval
              <input :value="settings.interval">
            </label>
          </span>
      <span class="setting">
            <label id='auto-progress-label' for='auto-progress'>
              Auto-transition
              <input
                     id='auto-progress'
                     :value='settings.autoTransition'
                     type='checkbox'>
            </label>
      </span>
      <span v-if='settings.autoTransition'>
              <label
                  id="transition-delay-label"
                  class='session-settings__label'
                  for="transition-delay">
                transition delay
              </label>
      </span>
      <span class="setting">
           <label id='loop-label'>
              {{ settings.loop ? 'Looping' : 'No looping'}}
              <input type='checkbox' :value='settings.loop' v-show='false'/>
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
</template>

<style scoped>

.session-settings {
  display: grid;
  grid-template: 1fr / 1fr;
  border-radius: var(--border-radius);
  gap: 1rem;
}

.session-settings__body {
  display: grid;
  grid-template-columns: 1fr;
}

.setting {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.setting:first-child {
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}

.session-settings__body > :not(label) {
  text-align: left;
}

.session-settings label + * {
  justify-self: left;
}

</style>
