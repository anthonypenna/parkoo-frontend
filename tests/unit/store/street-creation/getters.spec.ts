import { StreetCreationState } from '@/models/StreetCreationState'
import { getters } from '@/store/street-creation/getters'
import { state } from '@/store/street-creation/state'

describe('getters', () => {
  let $state: StreetCreationState

  beforeEach(() => {
    $state = state()
  })

  describe('streetCleaningDays', () => {
    it('should return the street cleaning days', () => {
      expect(getters.streetCleaningDays($state)).toEqual({
        '0': false,
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false
      })
    })
  })

  describe('streetID', () => {
    it('should return the street id', () => {
      expect(getters.streetID($state)).toEqual('')
    })
  })

  describe('streetLat', () => {
    it('should return the street latitude', () => {
      expect(getters.streetLat($state)).toEqual(0)
    })
  })

  describe('streetLng', () => {
    it('should return the street longitude', () => {
      expect(getters.streetLng($state)).toEqual(0)
    })
  })

  describe('streetName', () => {
    it('should return the street name', () => {
      expect(getters.streetName($state)).toEqual('')
    })
  })
})
