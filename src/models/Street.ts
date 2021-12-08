export interface Street {
  id: string
  lat: number
  lng: number
  cleaningDays: Record<number, boolean>
}
