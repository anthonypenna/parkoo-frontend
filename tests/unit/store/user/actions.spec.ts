import { UserState } from '@/models/UserState'
import { actions } from '@/store/user/actions'
import { state } from '@/store/user/state'
import { until } from '@/utils/async'
import { ActionContext } from 'vuex'
import * as geolocation from '@/services/geolocation'

jest.mock('@/services/geolocation')

describe('actions', () => {
  let store: ActionContext<UserState, unknown>

  beforeEach(() => {
    store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {},
      rootGetters: {},
      rootState: {},
      state: state()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getPosition', () => {
    it('should get the user coordinates', async () => {
      const getGeolocationPosition = jest.spyOn(geolocation, 'getGeolocationPosition')
      await actions.getPosition(store)
      expect(getGeolocationPosition).toHaveBeenCalled()
    })

    describe('when an error occurs', () => {
      beforeEach(() => {
        jest.spyOn(geolocation, 'getGeolocationPosition').mockRejectedValue({ message: 'Error!' })
      })

      it('should throw the error', async () => {
        const [error] = await until(() => actions.getPosition(store))
        expect(error).toEqual({ message: 'Error!' })
      })
    })

    describe('when receiving coordinates', () => {
      const position = {
        coords: { latitude: 45, longitude: 9 }
      }

      beforeEach(() => {
        jest.spyOn(geolocation, 'getGeolocationPosition').mockResolvedValue(position as GeolocationPosition)
      })

      it('should set the user coordinates', async () => {
        await actions.getPosition(store)
        expect(store.commit).toHaveBeenCalledWith('setLat', 45)
        expect(store.commit).toHaveBeenCalledWith('setLng', 9)
      })

      it('should update the users last known position', async () => {
        const saveLastKnownPosition = jest.spyOn(geolocation, 'saveLastKnownPosition')
        await actions.getPosition(store)
        expect(saveLastKnownPosition).toHaveBeenCalledWith({ lat: 45, lng: 9 })
      })
    })
  })
})
