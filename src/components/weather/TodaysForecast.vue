<template>
    <div class="weather-todays-block position-relative mb-4">
        <div class="content d-flex flex-column justify-content-center align-items-center" v-if="forecast !== null">
            <div class="todays-degrees">
                {{ forecast.current.temp.toFixed(0) }}
                <span>
                    <b-icon-circle/>
                </span>
            </div>
            <div class="forecast">
                <div class="city d-flex justify-content-center">
                    {{ forecast.city_name ? forecast.city_name : 'Your current location' }}
                </div>
                <div class="todays-weather d-flex justify-content-center">
                    {{ forecast.current.weather[0].description }}
                    <img :src="getImgUrl(forecast.current.weather[0].icon)" alt="">
                </div>
            </div>
        </div>
        <div class="d-flex w-100 h-100 justify-content-center align-items-center" v-else>
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: "TodaysWeather.vue",
    computed: {
        ...mapGetters({
            forecast: 'forecast'
        })
    },
     methods: {
        getImgUrl(icon) {
            return 'http://openweathermap.org/img/wn/' + icon + '.png'
        }
    },
}
</script>

<style scoped>

</style>
