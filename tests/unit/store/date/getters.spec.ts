import { DateState } from '@/models/DateState'
import { getters } from '@/store/date/getters'

describe('getters', () => {
  const state: DateState = {
    currentDay: new Date().getDay()
  }

  describe('currentDay', () => {
    it('should return the current day', () => {
      expect(getters.currentDay(state)).toEqual(new Date().getDay())
    })
  })
})
