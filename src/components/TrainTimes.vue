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


<template >
    <div class="p-10">
        <h3 class="text-3xl text-left pb-10">85th street - Forest Parkway</h3>
        <div class="  w-full border-2 flex justify-between align-middle">
            <div class="flex row-auto">
                <img  class="m-5" width="10%"src="https://upload.wikimedia.org/wikipedia/commons/f/f9/NYCS-bull-trans-J-Std.svg"/>
                <p class="text-2xl text-center  p-10">{{trainDirection}}</p>
            </div>
            <p class="text-2xl text-center  p-10">{{trainDistance}} mins</p>
        </div>
    </div>
</template>