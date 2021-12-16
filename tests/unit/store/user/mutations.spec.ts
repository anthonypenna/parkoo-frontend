import { UserState } from '@/models/UserState'
import { mutations } from '@/store/user/mutations'
import { state } from '@/store/user/state'

describe('mutations', () => {
  let $state: UserState

  beforeEach(() => {
    $state = state()
  })

  describe('setHasFetchedGeolocation', () => {
    it('should set the user fetched geolocation state', () => {
      mutations.setHasFetchedGeolocation($state, true)
      expect($state.hasFetchedGeolocation).toEqual(true)
    })
  })

  describe('setHasFetchedStreets', () => {
    it('should set the user fetched streets state', () => {
      mutations.setHasFetchedStreets($state, true)
      expect($state.hasFetchedStreets).toEqual(true)
    })
  })

  describe('setLat', () => {
    it('should set the user latitude', () => {
      mutations.setLat($state, 45)
      expect($state.lat).toEqual(45)
    })
  })

  describe('setLng', () => {
    it('should set the user longitude', () => {
      mutations.setLng($state, 9)
      expect($state.lng).toEqual(9)
    })
  })
})
