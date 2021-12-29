<template>
    <div id="app">
        <div class="d-flex justify-content-center py-5">
            Weather app example for Nordcode
        </div>
        <div class="d-flex w-100 py-5 my-5 flex-column justify-content-center align-items-center" v-if="loading">
            <div class="loader"></div>
            <div class="helper-text">
                Loading and filtering cities...
            </div>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">

html, body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif !important;
}

.helper-text {
    font-size: 12px;
    text-transform: uppercase;
    margin-top: 10px;
}

</style>

<script>

import {mapGetters} from 'vuex'

export default {
    data: () => ({
        loading: false,
        coordinates: {
            lat: '',
            lng: ''
        }
    }),
    computed: {
        ...mapGetters({
            cities: 'cities'
        })
    },
    watch: {
        cities(citiesGotUpdated) {
            if (citiesGotUpdated) {
                this.loading = false
            }
        }
    },
    created() {
        if (!localStorage.getItem('cities')) {
            this.loading = true
        }
    }

}

</script>
