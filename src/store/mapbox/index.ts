import { MapboxState } from '@/models/MapboxState'
import { Module } from 'vuex'
import { Map } from 'mapbox-gl'
import { MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { getInitialCenter } from '@/utils/mapbox'
import { RootState } from '@/models/RootState'
import { reverseGeocode } from '@/services/geocoding'
import { Position } from '@/models/Position'
import { until } from '@/utils/async'

export const mapboxStore: Module<MapboxState, RootState> = {
  namespaced: true,

  state: {
    accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || '',
    center: getInitialCenter(),
    theme: MAPBOX_THEME,
    zoom: MAPBOX_ZOOM,
    map: null,
  },

  mutations: {
    setMap(state, map: Map) {
      state.map = map
    },
  },

  actions: {
    async getStreetNameFromCoordinates(store, { lat, lng }: Position) {
      const accessToken = store.getters['accessToken']
      const [error, response] = await until(() =>
        reverseGeocode(lat, lng, accessToken)
      )

      if (error) throw error

      return response?.features[0]
    },
  },

  getters: {
    accessToken: state => state.accessToken,
    center: state => state.center,
    theme: state => state.theme,
    zoom: state => state.zoom,
    map: state => state.map,
  },
}
