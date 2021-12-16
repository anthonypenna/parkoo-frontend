import { UserState } from '@/models/UserState'
import { state } from '@/store/user/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<UserState>({
      hasFetchedGeolocation: false,
      hasFetchedStreets: false,
      lat: 0,
      lng: 0
    })
  })
})
