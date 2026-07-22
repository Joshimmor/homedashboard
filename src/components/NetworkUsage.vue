<template>
  <div class="dashboard h-[50vh] md:h-[30vh] flex flex-col justify-center">
    <h2>WAN Performance Monitoring</h2>
    <p>Status: {{ connectionStatus }}</p>

    <!-- Pass the new tickCounter prop here -->
    <div class="chart-wrapper w-full h-[38vh] md:h-[22vh]">
      <NetworkChart
        :download-history="downloadHistory" 
        :upload-history="uploadHistory" 
        :labels="chartLabels" 
        :tick-counter="tickCounter"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { streamWanSpeeds } from '../lib/getMockBandwidth';

import NetworkChart from './NetworkChart.vue';

const connectionStatus = ref('disconnected');
const downloadHistory = ref([]);
const uploadHistory = ref([]);
const chartLabels = ref([]);
const tickCounter = ref(0); // Add this counter to trigger rendering updates

let stopStream = null;
const MAX_DATA_POINTS = 50;

onMounted(() => {
  stopStream = streamWanSpeeds(
    (interfaces) => {
      if (interfaces?.eth0?.stats) {
        const rxBps = parseInt(interfaces.eth0.stats.rx_bps, 10) || 0;
        const txBps = parseInt(interfaces.eth0.stats.tx_bps, 10) || 0;

        const downloadMbps = parseFloat((rxBps / 1000000).toFixed(2));
        const uploadMbps = parseFloat((txBps / 1000000).toFixed(2));

        const currentTime = new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        });

        downloadHistory.value.push(downloadMbps);
        uploadHistory.value.push(uploadMbps);
        chartLabels.value.push(currentTime);

        if (downloadHistory.value.length > MAX_DATA_POINTS) {
          downloadHistory.value.shift();
          uploadHistory.value.shift();
          chartLabels.value.shift();
        }

        // Increment the counter on every single data tick
        tickCounter.value++;
      }
    },
    (status) => {
      connectionStatus.value = status;
    }
  );
});

onUnmounted(() => {
  if (stopStream) stopStream();
});
</script>
