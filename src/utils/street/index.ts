import { Day } from '@/constants/date'
import { Street } from '@/models/Street'

export function isStreetCleanedTomorrow(street: Street): boolean {
  const today = new Date(Date.now()).getDay()
  const tomorrow = today === Day.Saturday ? Day.Sunday : today + 1
  return street.cleaningDays[tomorrow as Day] || false
}
