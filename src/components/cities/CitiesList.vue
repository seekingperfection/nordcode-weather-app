<template>
    <div class="cities-block position-relative ">
        <h1>City select</h1>
        <span class="icon-hide-placement">
            <b-icon-x-circle @click="$emit('onHide')"/>
        </span>
        <div v-if="filterQuery.length !== 0">
            <span class="helper">Searching by: <span class="query" >"{{ filterQuery }}"</span> </span>
        </div>
        <div class="cities-list custom-scrollbar">
            <City v-for="city in filteredCitiesList" :key="city.id" :filterQuery="filterQuery" :city="city"></City>
            <div class="fs-12 my-5 py-5 d-flex justify-content-center " v-if="filteredCitiesList.length === 0">Matching query does not exist.</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import City from './City'

export default {
    name: "CitiesList",
    props: {
        filterQuery: {
            type: String,
            default: 'x'
        }
    },
    data: () => ({
        filter: '',
    }),

    components: {
        City
    },
    computed: {
        ...mapGetters({
            cities: 'cities'
        }),
        filteredCitiesList() {
            if (this.filterQuery.length !== 0) {
                return this.cities.filter(city => {
                    return city.name.toLowerCase().includes(this.filterQuery.toLowerCase())
                })
            }
            return this.cities
        }
    },
}
</script>

<style scoped>

</style>
