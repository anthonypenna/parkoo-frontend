import { LoadingState } from '@/models/LoadingState'
import { mutations } from '@/store/loading/mutations'
import { state } from '@/store/loading/state'

describe('mutations', () => {
  let $state: LoadingState

  beforeEach(() => {
    $state = state()
  })

  describe('setShowLoading', () => {
    it('should set the loading state', () => {
      mutations.setShowLoading($state, false)
      expect($state.showLoading).toEqual(false)
    })
  })
})
