import { MapboxState } from '@/models/MapboxState'
import { state } from '@/store/mapbox/state'
import { ActionContext } from 'vuex'
import { actions } from '@/store/mapbox/actions'
import { Position } from '@/models/Position'
import { until } from '@/utils/async'
import * as geocoding from '@/services/geocoding'

jest.mock('@/services/geocoding')

describe('actions', () => {
  let store: ActionContext<MapboxState, unknown>

  beforeEach(() => {
    store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        accessToken: 'token'
      },
      rootGetters: {},
      rootState: {},
      state: state()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getStreetDataFromCoordinates', () => {
    const position: Position = { lat: 45, lng: 9 }

    it('should reverse geocode the coordinates', async () => {
      const reverseGeocode = jest.spyOn(geocoding, 'reverseGeocode').mockResolvedValue({ features: [] })
      await actions.getStreetDataFromPosition(store, position)
      expect(reverseGeocode).toHaveBeenCalledWith(45, 9, 'token')
    })

    describe('when an error occurs', () => {
      beforeEach(() => {
        jest.spyOn(geocoding, 'reverseGeocode').mockRejectedValue({ message: 'Error!' })
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should throw the error', async () => {
        const [error] = await until(() => actions.getStreetDataFromPosition(store, position))
        expect(error).toEqual({ message: 'Error!' })
      })
    })

    describe('when geocoding succeeds', () => {
      beforeEach(() => {
        jest.spyOn(geocoding, 'reverseGeocode').mockResolvedValue({ features: [{ id: 'id', text: 'text' }] })
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should return the street data', async () => {
        const data = await actions.getStreetDataFromPosition(store, position)
        expect(data).toEqual({ id: 'id', text: 'text' })
      })
    })
  })
})
