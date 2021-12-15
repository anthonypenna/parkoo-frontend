import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { streetsStore } from '@/store/streets'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as StreetsService from '@/services/streets'
import * as StreetUtils from '@/utils/street'
import { until } from '@/utils/async'

jest.mock('@/services/streets')
jest.mock('@/utils/street')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('streets store', () => {
  const store = new Vuex.Store<{ streets: StreetsState }>({
    modules: {
      streets: { ...streetsStore },
    },
  })

  const initialState = JSON.stringify(store.state)

  beforeEach(() => {
    store.replaceState(JSON.parse(initialState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have a default state', () => {
    expect(store.state.streets).toEqual<StreetsState>({
      streets: [],
    })
  })

  describe('mutations', () => {
    describe('setStreets', () => {
      it('should set the streets', () => {
        const streets: Street[] = [
          {
            cleaningDays: {
              '0': false,
              1: false,
              2: false,
              3: false,
              4: false,
              5: false,
              6: false,
            },
            id: '',
            lat: 45,
            lng: 9,
          },
        ]

        store.commit('streets/setStreets', streets)
        expect(store.state.streets.streets).toEqual(streets)
      })
    })
  })

  describe('actions', () => {
    describe('getStreets', () => {
      it('should get the latest street list', async () => {
        const getStreets = jest.spyOn(StreetsService, 'getStreets')
        await store.dispatch('streets/getStreets')
        expect(getStreets).toHaveBeenCalled()
      })

      describe('when the request fails', () => {
        it('should throw', async () => {
          jest.spyOn(StreetsService, 'getStreets').mockRejectedValue({})

          const [error] = await until(() =>
            store.dispatch('streets/getStreets')
          )

          expect(error).toEqual({})
        })
      })

      describe('when the request succeeds', () => {
        it('should set the store streets', async () => {
          jest.spyOn(StreetsService, 'getStreets').mockResolvedValue({
            streets: [
              {
                cleaningDays: {
                  '0': false,
                  1: false,
                  2: false,
                  3: false,
                  4: false,
                  5: false,
                  6: false,
                },
                id: '',
                lat: 0,
                lng: 0,
              },
            ],
          })

          await store.dispatch('streets/getStreets')

          expect(store.state.streets.streets).toEqual([
            {
              cleaningDays: {
                '0': false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
              },
              id: '',
              lat: 0,
              lng: 0,
            },
          ])
        })
      })
    })

    describe('createStore', () => {
      it('should create a new street', async () => {
        const createStreet = jest.spyOn(StreetsService, 'createStreet')
        await store.dispatch('streets/createStreet')
        expect(createStreet).toHaveBeenCalled()
      })

      describe('when the request fails', () => {
        it('should throw', async () => {
          jest
            .spyOn(StreetsService, 'createStreet')
            .mockRejectedValue({ message: 'Error!' })

          const [error] = await until(() =>
            store.dispatch('streets/createStreet')
          )

          expect(error).toEqual({ message: 'Error!' })
        })
      })

      describe('when the request succeeds', () => {
        it('should update the street list', async () => {
          jest.spyOn(StreetsService, 'createStreet').mockResolvedValue({
            street: {
              cleaningDays: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
              },
              id: 'address.3129823489',
              lat: 45,
              lng: 9,
            },
          })

          const dispatch = jest.spyOn(store, 'dispatch')
          await store.dispatch('streets/createStreet')

          dispatch.mock.calls.splice(0, 1)
          expect(dispatch).toHaveBeenCalledWith('streets/getStreets', undefined)
        })
      })
    })
  })

  describe('getters', () => {
    describe('streets', () => {
      it('should return the streets', () => {
        const streets = store.getters['streets/streets']
        expect(streets).toEqual([])
      })
    })

    describe('hasStreets', () => {
      describe('when there are no streets', () => {
        it('should return false', () => {
          const hasStreets = store.getters['streets/hasStreets']
          expect(hasStreets).toEqual(false)
        })
      })

      describe('when there are streets', () => {
        it('should return true', () => {
          store.commit('streets/setStreets', [{}])

          const hasStreets = store.getters['streets/hasStreets']
          expect(hasStreets).toEqual(true)
        })
      })
    })

    describe('isStreetCleanedTomorrow', () => {
      describe('when the street isnt cleaned tomorrow', () => {
        it('should return false', () => {
          jest
            .spyOn(StreetUtils, 'isStreetCleanedTomorrow')
            .mockReturnValue(false)

          const isStreetCleanedTomorrow =
            store.getters['streets/isStreetCleanedTomorrow']()

          expect(isStreetCleanedTomorrow).toEqual(false)
        })
      })

      describe('when the street is cleaned tomorrow', () => {
        it('should return true', () => {
          jest
            .spyOn(StreetUtils, 'isStreetCleanedTomorrow')
            .mockReturnValue(true)

          const isStreetCleanedTomorrow =
            store.getters['streets/isStreetCleanedTomorrow']()

          expect(isStreetCleanedTomorrow).toEqual(true)
        })
      })
    })
  })
})
