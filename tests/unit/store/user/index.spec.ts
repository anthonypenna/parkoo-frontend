import { UserState } from '@/models/UserState'
import { userStore } from '@/store/user'
import { createLocalVue } from '@vue/test-utils'
import * as GeolocationService from '@/services/geolocation'
import Vuex from 'vuex'
import { until } from '@/utils/async'

jest.mock('@/services/geolocation')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('user store', () => {
  const store = new Vuex.Store<{ user: UserState }>({
    modules: {
      user: { ...userStore },
    },
  })

  const initialState = JSON.stringify(store.state)

  beforeEach(() => {
    store.replaceState(JSON.parse(initialState))
  })

  it('should have a default state', () => {
    expect(store.state.user).toEqual<UserState>({
      lat: 0,
      lng: 0,
    })
  })

  describe('mutations', () => {
    describe('setLat', () => {
      it('should set the latitude', () => {
        store.commit('user/setLat', 45)
        expect(store.state.user.lat).toEqual(45)
      })
    })

    describe('setLng', () => {
      it('should set the longitude', () => {
        store.commit('user/setLng', 9)
        expect(store.state.user.lng).toEqual(9)
      })
    })
  })

  describe('actions', () => {
    describe('getPosition', () => {
      it('should get the user position', async () => {
        const getGeolocationPosition = jest.spyOn(
          GeolocationService,
          'getGeolocationPosition'
        )

        await store.dispatch('user/getPosition')
        expect(getGeolocationPosition).toHaveBeenCalled()
      })

      describe('when an error occurs', () => {
        it('should throw', async () => {
          jest
            .spyOn(GeolocationService, 'getGeolocationPosition')
            .mockRejectedValue({ message: 'Oops!' })

          const [error] = await until(() => store.dispatch('user/getPosition'))
          expect(error).toEqual({ message: 'Oops!' })
        })
      })

      describe('when coordinates are received', () => {
        it('should update the user coordinates', async () => {
          jest
            .spyOn(GeolocationService, 'getGeolocationPosition')
            .mockResolvedValue({
              coords: { latitude: 45, longitude: 9 },
            } as GeolocationPosition)

          await store.dispatch('user/getPosition')

          expect(store.state.user).toEqual<UserState>({
            lat: 45,
            lng: 9,
          })
        })
      })
    })
  })

  describe('getters', () => {
    describe('lat', () => {
      it('should return the latitude', () => {
        const latitude = store.getters['user/lat']
        expect(latitude).toEqual(0)
      })
    })

    describe('lng', () => {
      it('should return the longitude', () => {
        const longitude = store.getters['user/lng']
        expect(longitude).toEqual(0)
      })
    })
  })
})
