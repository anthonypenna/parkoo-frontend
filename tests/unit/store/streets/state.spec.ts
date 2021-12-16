import { StreetsState } from '@/models/StreetsState'
import { state } from '@/store/streets/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<StreetsState>({
      streets: []
    })
  })
})
