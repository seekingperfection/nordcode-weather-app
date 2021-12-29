<template>
    <div class="day-forecast-short d-flex flex-column justify-content-center align-items-center">
        <div class="day-indicator">
            {{  getDayIndicator(day.moonrise) }}
        </div>

        <img :src="getImgUrl(day.weather[0].icon)" alt="">

        <div class="degrees position-relative d-flex">

            <div class="max position-relative px-1 mx-0  mx-md-1">
                {{ day.temp.max.toFixed(0) }}
                <span>
                    <b-icon-circle/>
                </span>
            </div>

            <div class="min position-relative px-1 mx-0  mx-md-1">
                {{ day.temp.min.toFixed(0) }}
                <span>
                    <b-icon-circle/>
                </span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        day: {
            type: Object,
        }
    },
    name: "DayForecast",
    methods: {
        getImgUrl(icon) {
            return 'http://openweathermap.org/img/wn/' + icon + '.png'
        },
        getDayIndicator(day) {
            return new Date(day * 1000).toLocaleDateString('en', {weekday: 'long'}).slice(0,3);
        }
    },
}
</script>

<style scoped>

</style>
