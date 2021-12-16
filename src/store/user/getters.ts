import { UserState } from '@/models/UserState'

export const getters = {
  hasFetchedGeolocation: (state: UserState) => state.hasFetchedGeolocation,
  hasFetchedStreets: (state: UserState) => state.hasFetchedStreets,
  isReady: (state: UserState) => state.hasFetchedGeolocation && state.hasFetchedStreets,
  lat: (state: UserState) => state.lat,
  lng: (state: UserState) => state.lng
}
