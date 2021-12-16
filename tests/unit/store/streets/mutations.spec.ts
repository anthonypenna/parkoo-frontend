import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { mutations } from '@/store/streets/mutations'

describe('mutations', () => {
  const state: StreetsState = {
    streets: []
  }

  describe('setStreets', () => {
    it('should set the streets', () => {
      const street: Street = {
        cleaningDays: {
          '0': false,
          '1': false,
          '2': false,
          '3': false,
          '4': false,
          '5': false,
          '6': false
        },
        id: '',
        lat: 0,
        lng: 0
      }

      mutations.setStreets(state, [street])
      expect(state.streets).toEqual([street])
    })
  })
})
