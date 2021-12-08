import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { streetsStore } from '@/store/streets'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as StreetsService from '@/services/streets'
import { until } from '@/utils/async'

jest.mock('@/services/streets')

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

  it('should have a default state', () => {
    expect(store.state.streets).toEqual<StreetsState>({
      streets: [],
    })
  })

  describe('mutations', () => {
    describe('setStreets', () => {
      it('should set the streets', () => {
        const streets: Street[] = [
          { cleaningDays: { 0: true }, id: '', lat: 45, lng: 9 },
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
            streets: [{ cleaningDays: { 0: true }, id: '', lat: 0, lng: 0 }],
          })

          await store.dispatch('streets/getStreets')

          expect(store.state.streets.streets).toEqual([
            { cleaningDays: { 0: true }, id: '', lat: 0, lng: 0 },
          ])
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
  })
})
