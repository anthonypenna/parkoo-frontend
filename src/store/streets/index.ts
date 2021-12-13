import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { getStreets } from '@/services/streets'
import { until } from '@/utils/async'
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
  },

  getters: {
    streets: state => state.streets,
    hasStreets: state => state.streets.length > 0,
  },
}
