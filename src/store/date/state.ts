import { DateState } from '@/models/DateState'

export const state = (): DateState => ({
  currentDay: new Date().getDay()
})
