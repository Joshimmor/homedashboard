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
  <div class="flex flex-col md:flex-row w-full px-4 md:px-10">
    <EnergyUsage class="w-full md:w-1/2 py-3 md:px-10"/>
    <NetworkUsage class="w-full md:w-1/2 py-3 md:px-10"/>
  </div>
</template>
