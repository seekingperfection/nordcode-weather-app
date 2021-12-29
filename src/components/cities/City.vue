<template>
    <div class="city" v-html="setCityNameAndHighlightTextByFilterQuery()" @click="selectCity">
    </div>
</template>

<script>
export default {
    name: "City.vue",
    props: {
        city: {
            type: Object,
        },
        filterQuery: {
            type: String,
            default: ''
        }
    },
    methods: {
        setCityNameAndHighlightTextByFilterQuery() {
            if (this.filterQuery.length !== 0) {
                return this.city.name.replace(new RegExp(this.filterQuery, 'gi'), match => {
                    return `<span class="highlighted">` + match + `</span>`
                })
            } else {
                return this.city.name
            }
        },
        async selectCity() {
            await this.$store.dispatch('setSelectedCity', this.city)
        }
    }
}
</script>

<style scoped>

</style>
