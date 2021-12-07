import Vue from 'vue'
import Vuex from 'vuex'
import { mapboxStore } from './mapbox'
import { userStore } from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mapbox: mapboxStore,
    user: userStore,
  },
})
