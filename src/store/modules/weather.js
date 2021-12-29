import * as types from "../mutation-types"
import api_key from "@/helpers/index"
import axios from "axios"

export const state = {
    forecast: null
}

export const mutations = {
    [types.SET_WEATHER_DATA](state, payload) {
        payload.data.city_name = payload.payload.name
        state.forecast = payload.data
    },
    [types.SET_FILTERED_FIVE_DAYS_FORECAST_DATA](state, payload) {
        state.fiveDaysForecast = payload.list
    }
}

export const actions = {
    async getWeatherData({commit}, payload) {
        if (payload.coordinates) {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${payload.coordinates.lat}&lon=${payload.coordinates.lng}&exclude={part}&appid=${api_key}&units=metric`)
            commit(types.SET_WEATHER_DATA, {payload: payload, data: data})
        } else {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${payload.coord.lat}&lon=${payload.coord.lon}&exclude={part}&appid=${api_key}&units=metric`)
            commit(types.SET_WEATHER_DATA, {payload: payload, data: data})
        }
    },
}

export const getters = {
    forecast: state => state.forecast,
}
