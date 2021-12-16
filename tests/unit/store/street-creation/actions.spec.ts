import { StreetCreationState } from '@/models/StreetCreationState'
import { actions } from '@/store/street-creation/actions'
import { state } from '@/store/street-creation/state'
import { ActionContext } from 'vuex'
import { until } from '@/utils/async'
import { Street } from '@/models/Street'
import * as streets from '@/services/streets'

jest.mock('@/services/streets')

describe('actions', () => {
  let store: ActionContext<StreetCreationState, unknown>
  let street: Street

  beforeEach(() => {
    store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: {
        streetCleaningDays: {
          '0': false,
          '1': false,
          '2': false,
          '3': false,
          '4': false,
          '5': false,
          '6': false
        },
        streetID: '',
        streetLat: 0,
        streetLng: 0
      },
      rootGetters: {},
      rootState: {},
      state: state()
    }

    street = {
      cleaningDays: {
        '0': false,
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false
      },
      id: '',
      lat: 0,
      lng: 0
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('resetFields', () => {
    it('should set the correct street creation state', () => {
      actions.resetFields(store)
      expect(store.commit).toHaveBeenCalledWith('setStreetCleaningDays', {
        '0': false,
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false
      })
      expect(store.commit).toHaveBeenCalledWith('setStreetID', '')
      expect(store.commit).toHaveBeenCalledWith('setStreetLat', 0)
      expect(store.commit).toHaveBeenCalledWith('setStreetLng', 0)
      expect(store.commit).toHaveBeenCalledWith('setStreetName', '')
    })
  })

  describe('createStreet', () => {
    it('should create a new street', async () => {
      const createStreet = jest.spyOn(streets, 'createStreet')
      await actions.createStreet(store)
      expect(createStreet).toHaveBeenCalledWith(street)
    })

    describe('when an error occurs', () => {
      beforeEach(() => {
        jest.spyOn(streets, 'createStreet').mockRejectedValue({ message: 'Error!' })
      })

      it('should throw the error', async () => {
        const [error] = await until(() => actions.createStreet(store))
        expect(error).toEqual({ message: 'Error!' })
      })
    })
  })
})
