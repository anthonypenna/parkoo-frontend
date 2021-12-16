import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { actions } from '@/store/banner/actions'
import { state } from '@/store/banner/state'
import { ActionContext } from 'vuex'

describe('actions', () => {
  let store: ActionContext<BannerState, unknown>

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

  describe('showErrorBanner', () => {
    it('should set the correct banner state', () => {
      actions.showErrorBanner(store, 'Oh oh!')
      expect(store.commit).toHaveBeenCalledWith('setText', 'Oh oh!')
      expect(store.commit).toHaveBeenCalledWith('setType', BannerType.Error)
      expect(store.commit).toHaveBeenCalledWith('setVisible', true)
    })
  })

  describe('showSuccessBanner', () => {
    it('should set the correct banner state', () => {
      actions.showSuccessBanner(store, 'Hello!')
      expect(store.commit).toHaveBeenCalledWith('setText', 'Hello!')
      expect(store.commit).toHaveBeenCalledWith('setType', BannerType.Success)
      expect(store.commit).toHaveBeenCalledWith('setVisible', true)
    })
  })
})
