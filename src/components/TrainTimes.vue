<script>
import {defineComponent, onMounted, ref,toRaw,computed} from "vue"
import getTrainTimes from "../lib/getTrainTimes"

export default defineComponent({
    setup(){
        const selectedTrainTime = ref({direction:"",time:""})
        const timeNow =  computed(() => Date.now())
        const trainDirection = ref(0)
        const trainDistance= ref(null)
        let trainTimes = [];
        let page = 0
        let shuffleInterval = 0
        const LATITUDE = 40.6892;
        const LONGITUDE = -73.8656;

        const LINE = 'JZ'
        onMounted(async () => {
            shuffleInterval = setInterval(async () => {
                if(trainTimes.length > 0){
                    let selectedTrain = trainTimes.slice(page)[0]
                    trainDirection.value = selectedTrain.direction
                    trainDistance.value = computed(() => {
                     return Math.floor((new Date(selectedTrain.time).getTime() - Date.now()) / (1000 * 60))
                    })
                    page++
                    if(page == trainTimes.length ){
                        page = 0
                        try{
                            let response = await getTrainTimes(LINE,LATITUDE,LONGITUDE)
                            trainTimes = response.trains.slice(0,4)
                        }
                        catch(error){
                            console.error("Failure to retrieve train times: ", error)
                         }
                    }
                }
            }, 5000);
        })
        
        onMounted( async () => {
                try{
                    let response = await getTrainTimes(LINE,LATITUDE,LONGITUDE)
                    trainTimes = response.trains.slice(0,4)

                    let selectedTrain = trainTimes.slice(page)[0]
                    trainDirection.value = selectedTrain.direction
                    trainDistance.value = computed(() => {
                     return Math.floor((new Date(selectedTrain.time).getTime() - Date.now()) / (1000 * 60))
                    })
                    page++
                }
                catch(error){
                    console.error("Failure to retrieve train times: ", error)
                }
        })

        return { trainDirection,trainDistance }
    }
})
</script>


<template>
    <div class="px-10 py-3">
        <h3 class="text-3xl text-left pb-4">85th St — Forest Parkway</h3>
        <div class="w-full rounded-xl border border-white/10 bg-white/5 flex items-center justify-between px-6 py-4">
            <div class="flex items-center gap-5">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/NYCS-bull-trans-J-Std.svg"
                    class="w-12 h-12"
                />
                <div class="flex flex-col">
                    <span class="text-xs font-semibold uppercase tracking-widest text-gray-400">Direction</span>
                    <span class="text-2xl font-medium text-white">{{ trainDirection }}</span>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <span class="text-xs font-semibold uppercase tracking-widest text-gray-400">Arriving in</span>
                <span class="text-2xl font-mono font-medium text-white">{{ trainDistance }} <span class="text-base text-gray-400">mins</span></span>
            </div>
  
        </div>
    </div>
</template>