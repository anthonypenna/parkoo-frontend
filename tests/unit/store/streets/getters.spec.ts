import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'
import { getters } from '@/store/streets/getters'

describe('getters', () => {
  let state: StreetsState

  beforeEach(() => {
    state = { streets: [] }
  })

  describe('streets', () => {
    it('should return the streets', () => {
      expect(getters.streets(state)).toEqual([])
    })
  })

  describe('hasStreets', () => {
    describe('when there are no streets', () => {
      it('should return false', () => {
        expect(getters.hasStreets(state)).toEqual(false)
      })
    })

    describe('when there are streets', () => {
      beforeEach(() => {
        state.streets.push({} as Street)
      })

      it('should return true', () => {
        expect(getters.hasStreets(state)).toEqual(true)
      })
    })
  })

  describe('isStreetCleanedTomorrow', () => {
    const thursday = 1639654229104

    describe('when the street is not cleaned tomorrow', () => {
      beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockReturnValue(thursday)
      })

      it('should return false', () => {
        const street = { cleaningDays: {} } as Street
        expect(getters.isStreetCleanedTomorrow()(street)).toEqual(false)
      })
    })
  })
})
