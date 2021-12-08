import { DateState } from '@/models/DateState'
import { Module } from 'vuex'

export const dateStore: Module<DateState, unknown> = {
  namespaced: true,

  state: {
    currentDay: new Date().getDay(),
  },

  getters: {
    currentDay: state => state.currentDay,
  },
}
