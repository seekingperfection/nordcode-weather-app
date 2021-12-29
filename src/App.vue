<template>
    <div id="app">
        <div class="d-flex justify-content-center py-5">
            Weather app example for Nordcode
        </div>
        <div class="d-flex w-100 py-5 my-5 justify-content-center align-items-center" v-if="loading">
            <div class="loader"></div>
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
