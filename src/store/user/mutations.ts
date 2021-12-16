import { UserState } from '@/models/UserState'

export const mutations = {
  setHasFetchedGeolocation: (state: UserState, hasFetchedGeolocation: boolean) => {
    state.hasFetchedGeolocation = hasFetchedGeolocation
  },

  setHasFetchedStreets: (state: UserState, hasFetchedStreets: boolean) => {
    state.hasFetchedStreets = hasFetchedStreets
  },

  setLat: (state: UserState, lat: number) => {
    state.lat = lat
  },

  setLng: (state: UserState, lng: number) => {
    state.lng = lng
  }
}
