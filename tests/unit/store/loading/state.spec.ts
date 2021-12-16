import { LoadingState } from '@/models/LoadingState'
import { state } from '@/store/loading/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<LoadingState>({
      showLoading: true
    })
  })
})
