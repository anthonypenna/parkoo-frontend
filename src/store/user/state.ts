import { UserState } from '@/models/UserState'

export const state = (): UserState => ({
  hasFetchedGeolocation: false,
  hasFetchedStreets: false,
  lat: 0,
  lng: 0,
})
