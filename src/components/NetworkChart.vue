<template>
  <div class="chart-container h-[30vh]">
    <!-- Bind the key to tickCounter instead of array length -->
    <Line :data="chartData" :options="chartOptions" :key="props.tickCounter" />
  </div>
</template>

<script setup>
import { computed, toRaw } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps({
  downloadHistory: { type: Array, required: true },
  uploadHistory: { type: Array, required: true },
  labels: { type: Array, required: true },
  tickCounter: { type: Number, required: true } // Add the tick property template tracker
});

const chartData = computed(() => ({
  labels: toRaw(props.labels),
  datasets: [
    {
      label: 'Download (Mbps)',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      data: toRaw(props.downloadHistory),
      tension: 0.3,
      pointRadius: 0
    },
    {
      label: 'Upload (Mbps)',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      data: toRaw(props.uploadHistory),
      tension: 0.3,
      pointRadius: 0
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false, // Keep false to ensure smooth scrolling behavior
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Speed (Mbps)' }
    }
  }
};
</script>
