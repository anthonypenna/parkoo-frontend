import Vue from 'vue'
import Vuex from 'vuex'
import { dateStore } from './date'
import { mapboxStore } from './mapbox'
import { streetsStore } from './streets'
import { userStore } from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mapbox: mapboxStore,
    user: userStore,
    streets: streetsStore,
    date: dateStore,
  },
})
