import { UserState } from '@/models/UserState'
import {
  getGeolocationPosition,
  saveLastKnownPosition,
} from '@/services/geolocation'
import { until } from '@/utils/async'
import { Module } from 'vuex'

export const userStore: Module<UserState, unknown> = {
  namespaced: true,

  state: {
    lat: 0,
    lng: 0,
  },

  mutations: {
    setLat(state, lat: number) {
      state.lat = lat
    },

    setLng(state, lng: number) {
      state.lng = lng
    },
  },

  actions: {
    async getPosition(store) {
      const [error, position] = await until(getGeolocationPosition)

      if (error) {
        throw error
      }

      if (!position) {
        return
      }

      const { latitude: lat, longitude: lng } = position.coords
      store.commit('setLat', lat)
      store.commit('setLng', lng)
      saveLastKnownPosition({ lat, lng })
    },
  },

  getters: {
    lat: state => state.lat,
    lng: state => state.lng,
  },
}
