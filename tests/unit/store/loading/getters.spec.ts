import { LoadingState } from '@/models/LoadingState'
import { getters } from '@/store/loading/getters'
import { state } from '@/store/loading/state'

describe('getters', () => {
  let $state: LoadingState

  beforeEach(() => {
    $state = state()
  })

  describe('showLoading', () => {
    it('should return the loading state', () => {
      expect(getters.showLoading($state)).toEqual(true)
    })
  })
})
