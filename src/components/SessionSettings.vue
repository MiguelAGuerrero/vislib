<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import TimeInput from './form/TimeInput.vue';

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
      <FontAwesomeIcon :icon="faGear"></FontAwesomeIcon>
      Settings
    </h1>
    <div class='session-settings__body'>
      <span class="setting">
        <label id='time-interval-label' for='time-interval'>
          Time interval
        </label>
        <time-input :value="settings.interval" />
      </span>
      <span class="setting">
        <label id='auto-progress-label' for='auto-progress'>
          Auto-transition
        </label>
        <input
          id='auto-progress'
          :value='settings.autoTransition'
          type='checkbox'>
      </span>
      <span class='setting' v-if='settings.autoTransition'>
        <label
            id="transition-delay-label"
            class='session-settings__label'
            for="transition-delay">
          Transition Delay
        </label>
        <time-input :value="settings.transitionDelay" :disabled="!settings.autoTransition" />
      </span>
      <span class="setting">
        <label id='loop-label'>
              Loop
        </label>
        <input type='checkbox' :value='settings.loop'/>
      </span>
      <span class="setting">
            <label>
              Shuffle Images
            </label>
        <input type="checkbox">
      </span>
    </div>
  </div>
</template>

<style scoped>

.session-settings {
  --gap-size: 1rem;
  display: grid;
  grid-template: 1fr / 1fr;
  border-radius: var(--border-radius);
  gap: var(--gap-size);
  place-items: center;
  color: var(--color-tertiary);
}

.session-settings__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gap-size);
}

.setting {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-size);
}

.setting :first-child {
  text-align: right;
}

.session-settings__body > :not(label) {
  text-align: left;
}

.session-settings label + * {
  justify-self: left;
}

input[type=checkbox] {
  margin: 0;
}

</style>
