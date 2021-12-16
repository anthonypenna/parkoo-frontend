import { ModalState } from '@/models/ModalState'
import { actions } from '@/store/modal/actions'
import { state } from '@/store/modal/state'
import { ActionContext } from 'vuex'

describe('actions', () => {
  let store: ActionContext<ModalState, unknown>

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

  describe('showAddStreetModal', () => {
    it('should set the correct modal state', () => {
      actions.showAddStreetModal(store)
      expect(store.commit).toHaveBeenCalledWith('setShowNoStreetsModal', false)
      expect(store.commit).toHaveBeenCalledWith('setShowAddStreetModal', true)
    })
  })

  describe('showNoStreetsModal', () => {
    it('should set the correct modal state', () => {
      actions.showNoStreetsModal(store)
      expect(store.commit).toHaveBeenCalledWith('setShowAddStreetModal', false)
      expect(store.commit).toHaveBeenCalledWith('setShowNoStreetsModal', true)
    })
  })
})
