import { LoadingState } from '@/models/LoadingState'
import { actions } from '@/store/loading/actions'
import { state } from '@/store/loading/state'
import { ActionContext } from 'vuex'

describe('actions', () => {
  let store: ActionContext<LoadingState, unknown>

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

  describe('startLoading', () => {
    it('should set the correct loading state', () => {
      actions.startLoading(store)
      expect(store.commit).toHaveBeenCalledWith('setShowLoading', true)
    })
  })

  describe('stopLoading', () => {
    it('should set the correct loading state', () => {
      actions.stopLoading(store)
      expect(store.commit).toHaveBeenCalledWith('setShowLoading', false)
    })
  })
})
