import * as types from "../mutation-types"

export const state = {
    cities: [],
    selectedCity: null,
}

export const mutations = {
    [types.SET_CITIES](state, payload) {
        state.cities = payload
    },
    [types.FILTER_CITIES](state) { // Filtering cities by country (Lithuania) because localStorage cannot store big chunk of data comming up from city.list.json
        state.cities = state.cities.filter(obj => obj.country === 'LT')
        localStorage.clear()
        localStorage.setItem('cities', JSON.stringify(state.cities))
    },
    [types.SET_SELECTED_CITY](state, payload) {
        state.selectedCity = payload
    },
    [types.CLEAR_SELECTED_CITY](state) {
        state.selectedCity = null
    },
}

export const actions = {
    setCities({commit, dispatch}, payload) {
        commit(types.SET_CITIES, payload)
        dispatch('filterCities')
    },
    filterCities({commit}) {
        commit(types.FILTER_CITIES)
    },
    setSelectedCity({commit, dispatch}, payload) {
        commit(types.SET_SELECTED_CITY, payload)
        dispatch('getWeatherData', payload)
    },
    clearSelectedCity({commit}) {
        commit(types.CLEAR_SELECTED_CITY)
    },
}

export const getters = {
    cities: state => state.cities,
    selectedCity: state => state.selectedCity
}
