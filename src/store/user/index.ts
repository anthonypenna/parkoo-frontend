import { UserState } from '@/models/UserState'
import { getGeolocationPosition } from '@/services/geolocation'
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

      store.commit('setLat', position?.coords.latitude)
      store.commit('setLng', position?.coords.longitude)
    },
  },

  getters: {
    lat: state => state.lat,
    lng: state => state.lng,
  },
}
