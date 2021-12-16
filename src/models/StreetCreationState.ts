import { Day } from '@/constants/date'

export interface StreetCreationState {
  streetID: string
  streetLat: number
  streetLng: number
  streetName: string
  streetCleaningDays: Record<Day, boolean>
}
