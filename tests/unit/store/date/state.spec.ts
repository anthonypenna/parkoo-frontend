import { DateState } from '@/models/DateState'
import { state } from '@/store/date/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<DateState>({
      currentDay: new Date().getDay()
    })
  })
})
