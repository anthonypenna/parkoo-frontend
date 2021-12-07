import { MapboxState } from '@/models/MapboxState'
import { Module } from 'vuex'
import { Map, LngLatLike } from 'mapbox-gl'
import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { Position } from '@/models/Position'

export const mapboxStore: Module<MapboxState, unknown> = {
  namespaced: true,

  state: {
    accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || '',
    center: MAPBOX_CENTER,
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
    goToCoordinates(store, { lat, lng }: Position) {
      const map = store.getters['map'] as Map | null

      if (!map) {
        return
      }

      const center = [lng, lat] as LngLatLike
      map.flyTo({ center })
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
