<script setup>
import { onMounted,ref } from 'vue';
import getWeatherForecast from '../lib/getWeatherForecast';
const isLoaded = ref(false)
const current = ref(0)
const forecast = ref(null)
const isMobile = () => window.innerWidth < 768
let interval = 0
onMounted(async ()=>{
    interval = setInterval( async () =>{
    isLoaded.value = false
    const weather = await getWeatherForecast()
    let location = weather.location
    current.value = weather.current
    let timeNow = new Date().getHours() + 1
    let limit = isMobile() ? 3 : 10
    let endTime = timeNow + limit > 24 ? 24 : timeNow + limit
    forecast.value = weather.forecast.forecastday[0].hour.slice(timeNow,endTime)
    console.log(weather)
    isLoaded.value = true
    },[900000])
})
onMounted(async ()=>{
    isLoaded.value = false
    const weather = await getWeatherForecast()
    let location = weather.location
    current.value = weather.current
    let timeNow = new Date().getHours() + 1
    let limit = isMobile() ? 4 : 10
    let endTime = timeNow + limit > 24 ? 24 : timeNow + limit
    forecast.value = weather.forecast.forecastday[0].hour.slice(timeNow,endTime)
    // console.log(weather)
    isLoaded.value = true
})
</script>
<template>
    <div class="w-full overflow-x-auto py-3 px-4 md:px-10">
      <div class="flex flex-row gap-2 min-w-max md:min-w-0 md:justify-between">
        <div class="flex flex-col w-16 md:w-1/12 items-center shrink-0 p-1">
             <p v-if="isLoaded">Now</p>
            <img  v-if="isLoaded" :src="current.condition.icon" class=""/>
            <p v-if="isLoaded" class="text-xs text-center">{{ current.condition.text }}</p>
        </div>
        <div v-for="(value, index) in forecast"
             class="p-1 w-16 md:w-1/12 justify-items-start items-center shrink-0"
             :class="index > 4 ? 'hidden md:flex md:flex-col' : 'flex flex-col'">
             <p v-if="isLoaded" class="text-xs text-center">{{new Date(value.time).getHours()>12?(new Date(value.time).getHours()-12).toString()+":00 PM":(new Date(value.time).getHours()).toString() + ":00 AM"}}</p>
            <img  v-if="isLoaded" :src="value.condition.icon" class=""/>
            <p v-if="isLoaded" class="text-xs text-center">{{ value.condition.text }}</p>
        </div>
      </div>
    </div>
</template>