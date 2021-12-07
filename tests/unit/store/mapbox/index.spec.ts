import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapboxState } from '@/models/MapboxState'
import { mapboxStore } from '@/store/mapbox'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as Mapbox from 'mapbox-gl'

jest.mock('mapbox-gl', () => ({
  Map: class {
    flyTo = jest.fn()
  },
}))

const localVue = createLocalVue()

localVue.use(Vuex)

describe('mapbox store', () => {
  const store = new Vuex.Store<{ mapbox: MapboxState }>({
    modules: {
      mapbox: { ...mapboxStore },
    },
  })

  const initialState = JSON.stringify(store.state)

  beforeEach(() => {
    store.replaceState(JSON.parse(initialState))
  })

  it('should have a default state', () => {
    expect(store.state.mapbox).toEqual<MapboxState>({
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || '',
      center: MAPBOX_CENTER,
      theme: MAPBOX_THEME,
      zoom: MAPBOX_ZOOM,
      map: null,
    })
  })

  describe('mutations', () => {
    describe('setMap', () => {
      it('should set the map', () => {
        store.commit('mapbox/setMap', {})
        expect(store.state.mapbox.map).toEqual({})
      })
    })
  })

  describe('actions', () => {
    describe('goToCoordinates', () => {
      describe('when the map is not null', () => {
        it('should go to the specified coordinates', () => {
          store.commit('mapbox/setMap', new Mapbox.Map())

          const map = store.getters['mapbox/map'] as Mapbox.Map
          const flyTo = jest.spyOn(map, 'flyTo')

          store.dispatch('mapbox/goToCoordinates', { lat: 45, lng: 9 })
          expect(flyTo).toHaveBeenCalledWith({ center: [9, 45] })
        })
      })
    })
  })

  describe('getters', () => {
    describe('accessToken', () => {
      it('should return the access token', () => {
        const accessToken = store.getters['mapbox/accessToken']
        expect(accessToken).toEqual(
          process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || ''
        )
      })
    })

    describe('center', () => {
      it('should return the map center', () => {
        const center = store.getters['mapbox/center']
        expect(center).toEqual(MAPBOX_CENTER)
      })
    })

    describe('theme', () => {
      it('should return the map theme', () => {
        const theme = store.getters['mapbox/theme']
        expect(theme).toEqual(MAPBOX_THEME)
      })
    })

    describe('zoom', () => {
      it('should return the map zoom', () => {
        const zoom = store.getters['mapbox/zoom']
        expect(zoom).toEqual(MAPBOX_ZOOM)
      })
    })

    describe('map', () => {
      it('should return the map instance', () => {
        const map = store.getters['mapbox/map']
        expect(map).toEqual(null)
      })
    })
  })
})
