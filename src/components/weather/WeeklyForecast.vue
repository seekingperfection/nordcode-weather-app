<template>
    <div class="weekly-forecast mt-4 position-relative mb-4">
        <h1>Weekly forecast</h1>
        <div v-if="forecast !== null" class="d-flex w-100 justify-content-between">
            <DayForecast  v-for="(day, index) in forecast.daily" :day="day" :key="index"></DayForecast>
        </div>
        <div class="d-flex justify-content-center align-items-center loader-block w-100" v-else>
            <div class="loader" ></div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import DayForecast from "@/components/weather/Day";

export default {
    name: "FiveDaysForecast",
    components: {
        DayForecast
    },
    computed: {
        ...mapGetters({
            forecast: 'forecast'
        })
    },
}
</script>

<style scoped>

</style>
