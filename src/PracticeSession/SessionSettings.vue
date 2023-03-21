<script setup>
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
              <input :value="interval">
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
           <label id='loop-label'>
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
