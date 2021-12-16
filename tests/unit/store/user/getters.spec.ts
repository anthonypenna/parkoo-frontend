import { UserState } from '@/models/UserState'
import { getters } from '@/store/user/getters'
import { state } from '@/store/user/state'

describe('getters', () => {
  let $state: UserState

  beforeEach(() => {
    $state = state()
  })

  describe('hasFetchedGeolocation', () => {
    describe('when the user hasnt fetched geolocation', () => {
      it('should return false', () => {
        expect(getters.hasFetchedGeolocation($state)).toEqual(false)
      })
    })

    describe('when the user has fetched geolocation', () => {
      beforeEach(() => {
        $state.hasFetchedGeolocation = true
      })

      it('should return true', () => {
        expect(getters.hasFetchedGeolocation($state)).toEqual(true)
      })
    })
  })

  describe('hasFetchedStreets', () => {
    describe('when the user hasnt fetched streets', () => {
      it('should return false', () => {
        expect(getters.hasFetchedStreets($state)).toEqual(false)
      })
    })

    describe('when the user has fetched streets', () => {
      beforeEach(() => {
        $state.hasFetchedStreets = true
      })

      it('should return true', () => {
        expect(getters.hasFetchedStreets($state)).toEqual(true)
      })
    })
  })

  describe('isReady', () => {
    describe('when the user hasnt fetched geolocation or streets', () => {
      it('should return false', () => {
        expect(getters.isReady($state)).toEqual(false)
      })
    })

    describe('when the user has fetched geolocation and streets', () => {
      beforeEach(() => {
        $state.hasFetchedGeolocation = true
        $state.hasFetchedStreets = true
      })

      it('should return true', () => {
        expect(getters.isReady($state)).toEqual(true)
      })
    })
  })

  describe('lat', () => {
    it('should return the user latitude', () => {
      expect(getters.lat($state)).toEqual(0)
    })
  })

  describe('lng', () => {
    it('should return the user longitude', () => {
      expect(getters.lng($state)).toEqual(0)
    })
  })
})
