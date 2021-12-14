export interface Street {
  id: string
  lat: number
  lng: number
  cleaningDays: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, boolean>
}
