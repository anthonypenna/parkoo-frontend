import { Street } from '@/models/Street'
import { isStreetCleanedTomorrow } from '@/utils/street'

const currentDate = 1639403187145

describe('isStreetCleanedTomorrow', () => {
  beforeEach(() => {
    Object.defineProperty(global.Date, 'now', {
      value: jest.fn(() => currentDate),
    })
  })

  describe('when the street wont be cleaned tomorrow', () => {
    it('should return false', () => {
      const street: Street = {
        cleaningDays: {
          0: true,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
        id: '',
        lat: 45,
        lng: 9,
      }

      expect(isStreetCleanedTomorrow(street)).toEqual(false)
    })
  })

  describe('when the street will be cleaned tomorrow', () => {
    it('should return true', () => {
      const street: Street = {
        cleaningDays: {
          0: false,
          1: false,
          2: true,
          3: false,
          4: false,
          5: false,
          6: false,
        },
        id: '',
        lat: 45,
        lng: 9,
      }

      expect(isStreetCleanedTomorrow(street)).toEqual(true)
    })
  })
})
