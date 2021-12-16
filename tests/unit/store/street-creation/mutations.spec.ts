import { StreetCreationState } from '@/models/StreetCreationState'
import { mutations } from '@/store/street-creation/mutations'
import { state } from '@/store/street-creation/state'

describe('mutations', () => {
  let $state: StreetCreationState

  beforeEach(() => {
    $state = state()
  })

  describe('setStreetCleaningDays', () => {
    it('should set the street cleaning days', () => {
      mutations.setStreetCleaningDays($state, {
        '0': false,
        '1': false,
        '2': true,
        '3': false,
        '4': false,
        '5': true,
        '6': false
      })

      expect($state.streetCleaningDays).toEqual({
        '0': false,
        '1': false,
        '2': true,
        '3': false,
        '4': false,
        '5': true,
        '6': false
      })
    })
  })

  describe('setStreetID', () => {
    it('should set the street ID', () => {
      mutations.setStreetID($state, 'id')
      expect($state.streetID).toEqual('id')
    })
  })

  describe('setStreetLat', () => {
    it('should set the street latitude', () => {
      mutations.setStreetLat($state, 45)
      expect($state.streetLat).toEqual(45)
    })
  })

  describe('setStreetLng', () => {
    it('should set the street longitude', () => {
      mutations.setStreetLng($state, 9)
      expect($state.streetLng).toEqual(9)
    })
  })

  describe('setStreetName', () => {
    it('should set the street name', () => {
      mutations.setStreetName($state, 'name')
      expect($state.streetName).toEqual('name')
    })
  })
})
