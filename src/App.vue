<script setup>
import TrainTimes from './components/TrainTimes.vue'
import EnergyUsage from './components/EnergyUsage.vue'
import NetworkUsage from './components/NetworkUsage.vue';
import Weather from './components/Weather.vue';
import Events from './components/Events.vue';
</script>

<template>
  <TrainTimes />
  <Weather/>
  <Events />
  <div class="flex row-auto w-full px-10">
    <EnergyUsage class="w-1/2 py-3 px-10"/>
    <NetworkUsage class="w-1/2 py-3 px-10"/>
  </div>
</template>
