<template>
   <div class="dashboard w-[50vw] h-[30vh] flex flex-col justify-center">
    <h2>Energy Usage Monitoring</h2>
  <div class="w-[50vw] h-[30vh]">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
   </div>
</template>

<script>
import getEnergyUsage from "../lib/getEnergyUsage.js"
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  
  data() {
    return {
      energyUsageList: [], 
      loaded: false,

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  computed: {
    chartData() {
      return {
        labels: this.energyUsageList.map(item => `${item.time}`),
        datasets: [
          {
            label: 'Daily Energy Usage',
            backgroundColor: '#6395EE',
            borderColor: '#6395EE',
            data: this.energyUsageList.map(item => item.usage)
          }
        ]
      }
    }
  },
  interval:0,
  async mounted() {
    this.interval = setInterval(async()=>{
        try {
        const energyData = await getEnergyUsage()
        this.energyUsageList = energyData.usage 
        this.loaded = true
        } catch (e) {
        console.error(e)
        }
    },3600000)
  },
    async mounted() {
        try {
        const energyData = await getEnergyUsage()
        this.energyUsageList = energyData.usage 
        this.loaded = true
        } catch (e) {
        console.error(e)
        }
  }
}
</script>

<style scoped>
/* 5. Set explicit parent height so chart renders correctly */
.container {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>
