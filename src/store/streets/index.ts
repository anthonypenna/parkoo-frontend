import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { createStreet, getStreets } from '@/services/streets'
import { until } from '@/utils/async'
import { isStreetCleanedTomorrow } from '@/utils/street'
import { Module } from 'vuex'

export const streetsStore: Module<StreetsState, unknown> = {
  namespaced: true,

  state: {
    streets: [],
  },

  mutations: {
    setStreets(state, streets: Street[]) {
      state.streets = streets
    },
  },

  actions: {
    async getStreets(store) {
      const [error, response] = await until(getStreets)

      if (error) {
        throw error
      }

      store.commit('setStreets', response?.streets)
    },

    async createStreet(store, street: Street) {
      const [error] = await until(() => createStreet(street))
      if (error) throw error
      await store.dispatch('getStreets')
    },
  },

  getters: {
    streets: state => state.streets,
    hasStreets: state => state.streets.length > 0,
    isStreetCleanedTomorrow: () => isStreetCleanedTomorrow,
  },
}
