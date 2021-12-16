import { Day } from '@/constants/date'
import { DateState } from '@/models/DateState'

export const getters = {
  currentDay: (state: DateState): Day => state.currentDay,
}
