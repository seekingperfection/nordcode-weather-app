<template>
    <div class="container">
        <div class="w-100 h-100">
            <div class="position-relative">
                <ValidationObserver v-slot="{handleSubmit}" ref="get_weather_form" class="form">
                    <form @submit.prevent="handleSubmit(onSubmit)" class="d-flex justify-content-center align-items-center">
                        <div class="d-flex justify-content-center form-group-block">
                            <TextField
                                v-model="city"
                                :name="'city'"
                                :placeholder="'Search...'"
                                :input-styles="'nordcode-input'"
                                :detectInputFocus="true"
                                @onFocus="inputFocus = true"
                            >
                                <template v-slot:search>
                                    <b-icon-search/>
                                </template>
                                <template v-slot:clear v-if="city.length !== 0">
                                    <b-icon-x-circle
                                        @click="city = ''; $store.dispatch('clearSelectedCity')"
                                    />
                                </template>
                            </TextField>
                        </div>
                    </form>
                </ValidationObserver>

                <div class="d-flex justify-content-center cities-container" >
                    <CitiesList :filterQuery="city" @onHide="inputFocus = !inputFocus" v-if="inputFocus"></CitiesList>
                </div>

                <div class="d-flex justify-content-center">
                    <TodaysWeather></TodaysWeather>
                </div>

                <div class="d-flex justify-content-center">
                    <FiveDaysForecast></FiveDaysForecast>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TextField from "@/components/inputs/TextField"
import {mapGetters} from 'vuex'
import TodaysWeather from "@/components/weather/TodaysForecast";
import CitiesList from "@/components/cities/CitiesList";
import FiveDaysForecast from "@/components/weather/WeeklyForecast";

export default {
    name: "HomePage",
    data: () => ({
        city: '',
        loading: false,
        inputFocus: false,

    }),
    components: {
        FiveDaysForecast,
        CitiesList,
        TextField,
        TodaysWeather
    },

    computed: {
        ...mapGetters({
            cities: 'cities',
            selectedCity: 'selectedCity'
        })
    },
    watch: {
        selectedCity(selectedCity) {
            if (selectedCity) {
                this.inputFocus = false
                this.city = selectedCity.name
            }
        }
    },
    methods: {
        onSubmit() {
            // created form with vee validate, because in the future we might need to add additional inputs,
            // f.e if api requires lat, lng, address etc. we can quickly solve this by slightly editing and reusing Textfield component
            console.log(this.city)
        },
        getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( // trying to get current user's location, falsy setting up Vilnius
                    (position) => this.$store.dispatch('getWeatherData', { coordinates: {lat: position.coords.latitude, lng: position.coords.longitude}}),
                    () => this.$store.dispatch('setSelectedCity', {coordinates: {lat: '54.687157', lng: '25.279652'}, name: 'Vilnius'}))
            } else {
                console.log('Geolocation is not supported on your browser.')
            }
        },
    },
    created() {
        if (!localStorage.getItem('cities')) {
            let citiesData = require('../dummy/city.list.json') // if cities doesnt exist in LS we import city.list.json and pass it to setCities vuex action to set it up
            this.$store.dispatch('setCities', citiesData)
        } else {
            this.$store.dispatch('setCities', JSON.parse(localStorage.getItem('cities')))
        }
        this.getUserLocation()
    }
}
</script>

<style scoped lang="scss">

</style>
