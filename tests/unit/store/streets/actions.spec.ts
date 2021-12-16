import { StreetsState } from '@/models/StreetsState'
import { state } from '@/store/streets/state'
import { ActionContext } from 'vuex'
import { actions } from '@/store/streets/actions'
import { until } from '@/utils/async'
import * as streets from '@/services/streets'

jest.mock('@/services/streets')

describe('actions', () => {
  let store: ActionContext<StreetsState, unknown>

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

  describe('getStreets', () => {
    it('should get the streets', async () => {
      const getStreets = jest.spyOn(streets, 'getStreets')
      await actions.getStreets(store)
      expect(getStreets).toHaveBeenCalled()
    })

    describe('when an error occurs', () => {
      beforeEach(() => {
        jest.spyOn(streets, 'getStreets').mockRejectedValue({ message: 'Error!' })
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should throw the error', async () => {
        const [error] = await until(() => actions.getStreets(store))
        expect(error).toEqual({ message: 'Error!' })
      })
    })

    describe('when receiving streets', () => {
      beforeEach(() => {
        jest.spyOn(streets, 'getStreets').mockResolvedValue({ streets: [] })
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should set the streets', async () => {
        await actions.getStreets(store)
        expect(store.commit).toHaveBeenCalledWith('setStreets', [])
      })
    })
  })
})
