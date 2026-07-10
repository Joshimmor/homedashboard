<script setup>
import TrainTimes from './components/TrainTimes.vue'
import EnergyUsage from './components/EnergyUsage.vue'
import NetworkUsage from './components/NetworkUsage.vue';
</script>

<template>
  <TrainTimes />
  <div class="flex row-auto p-10">
    <EnergyUsage/>
    <NetworkUsage/>
  </div>
</template>
