import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapboxState } from '@/models/MapboxState'
import { mutations } from '@/store/mapbox/mutations'
import * as mapbox from 'mapbox-gl'

jest.mock('mapbox-gl', () => ({ Map: jest.fn() }))

describe('mutations', () => {
  const state: MapboxState = {
    accessToken: 'token',
    center: MAPBOX_CENTER,
    map: new mapbox.Map(),
    theme: MAPBOX_THEME,
    zoom: MAPBOX_ZOOM
  }

  describe('setMap', () => {
    it('should set the map', () => {
      mutations.setMap(state, null)
      expect(state.map).toBeNull()
    })
  })
})
