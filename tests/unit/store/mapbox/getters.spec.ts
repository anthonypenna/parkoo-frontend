import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapboxState } from '@/models/MapboxState'
import { getters } from '@/store/mapbox/getters'

describe('getters', () => {
  const state: MapboxState = {
    accessToken: 'token',
    center: MAPBOX_CENTER,
    map: null,
    theme: MAPBOX_THEME,
    zoom: MAPBOX_ZOOM
  }

  describe('accessToken', () => {
    it('should return the accessToken', () => {
      expect(getters.accessToken(state)).toEqual('token')
    })
  })

  describe('center', () => {
    it('should return the map center', () => {
      expect(getters.center(state)).toEqual(MAPBOX_CENTER)
    })
  })

  describe('map', () => {
    it('should return the map', () => {
      expect(getters.map(state)).toEqual(null)
    })
  })

  describe('theme', () => {
    it('should return the map theme', () => {
      expect(getters.theme(state)).toEqual(MAPBOX_THEME)
    })
  })

  describe('zoom', () => {
    it('should return the map zoom', () => {
      expect(getters.zoom(state)).toEqual(MAPBOX_ZOOM)
    })
  })
})
