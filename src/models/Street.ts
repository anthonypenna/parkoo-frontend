import { Day } from '@/constants/date'

export interface Street {
  id: string
  lat: number
  lng: number
  cleaningDays: Record<Day, boolean>
}
