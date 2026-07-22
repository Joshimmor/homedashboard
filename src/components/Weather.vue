<script setup>
import { onMounted,ref } from 'vue';
import getWeatherForecast from '../lib/getWeatherForecast';
const isLoaded = ref(false)
const current = ref(0)
const forecast = ref(null)
let interval = 0
onMounted(async ()=>{
    interval = setInterval( async () =>{
    isLoaded.value = false
    const weather = await getWeatherForecast()
    let location = weather.location
    current.value = weather.current
    let timeNow = new Date().getHours() + 1
    let endTime = timeNow + 12 > 24 ? 24 : timeNow + 12
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
    let endTime = timeNow + 12 > 24 ? 24 : timeNow + 12
    forecast.value = weather.forecast.forecastday[0].hour.slice(timeNow,endTime)
    // console.log(weather)
    isLoaded.value = true
})
</script>
<template>
    <div class="w-full flex flex-row justify-between py-3 px-10">
        <div class="flex flex-col w-1/12 items-center justify-items-start p-1">
             <p v-if="isLoaded">Now</p>
            <img  v-if="isLoaded" :src="current.condition.icon" class=""/>
            <p v-if="isLoaded">{{ current.condition.text }}</p>
        </div>
        <div v-for="value in forecast" class="p-1 flex flex-col w-1/12 justify-items-start items-center">
             <p v-if="isLoaded">{{new Date(value.time).getHours()>12?(new Date(value.time).getHours()-12).toString()+":00 PM":(new Date(value.time).getHours()).toString() + ":00 AM"}}</p>
            <img  v-if="isLoaded" :src="value.condition.icon" class=""/>
            <p v-if="isLoaded">{{ value.condition.text }}</p>
        </div>
    </div>
</template>