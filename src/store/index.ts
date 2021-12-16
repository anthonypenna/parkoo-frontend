import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from '@/models/RootState'
import { date } from './date'
import { mapbox } from './mapbox'
import { streets } from './streets'
import { user } from './user'
import { banner } from './banner'
import { loading } from './loading'
import { modal } from './modal'
import { streetCreation } from './street-creation'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    banner,
    date,
    loading,
    mapbox,
    modal,
    streetCreation,
    streets,
    user
  }
})
