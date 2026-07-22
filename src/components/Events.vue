<script setup>
import { onMounted, ref } from 'vue';
import getEvents from '../lib/getEvents';

const events = ref(0)

onMounted(async ()=>{
    const queriedEvent = await getEvents()
    events.value = queriedEvent.sort((a,b)=> a.start.dateTime > b.start.dateTime)
    console.log(events)
})
</script>
<template>
    <div class="w-full flex flex-col px-10 py-3">
        <div class="w-full rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div class="grid grid-cols-[auto_1fr_auto] items-center px-5 py-2 border-b border-white/10">
                <span class="text-xs font-semibold uppercase tracking-widest text-gray-400 w-28">Time</span>
                <span class="text-xs font-semibold uppercase tracking-widest text-gray-400">Event</span>
                <span class="text-xs font-semibold uppercase tracking-widest text-gray-400">Owner</span>
            </div>
            <div
                v-for="(value, index) in events"
                :key="index"
                class="grid grid-cols-[auto_1fr_auto] items-center px-5 py-3 transition-colors hover:bg-white/5"
                :class="index !== events.length - 1 ? 'border-b border-white/10' : ''"
            >
                <span class="text-sm font-mono text-gray-300 w-28">
                    {{ new Date(value.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </span>
                <span class="text-sm font-medium text-white truncate pr-4">{{ value.summary }}</span>
                <span
                    class="text-xs font-semibold px-3 py-1 rounded-full"
                    :class="value.creator.email === 'joshimmor@gmail.com'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-pink-500/20 text-pink-300'"
                >
                    {{ value.creator.email === 'joshimmor@gmail.com' ? 'Joshua' : 'Brandy' }}
                </span>
            </div>
        </div>
    </div>
</template>