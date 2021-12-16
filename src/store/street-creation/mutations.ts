import { StreetCreationState } from '@/models/StreetCreationState'

export const mutations = {
  setStreetCleaningDays: (state: StreetCreationState, streetCleaningDays: Record<number, boolean>) => {
    state.streetCleaningDays = streetCleaningDays
  },

  setStreetID: (state: StreetCreationState, streetID: string) => {
    state.streetID = streetID
  },

  setStreetLat: (state: StreetCreationState, streetLat: number) => {
    state.streetLat = streetLat
  },

  setStreetLng: (state: StreetCreationState, streetLng: number) => {
    state.streetLng = streetLng
  },

  setStreetName: (state: StreetCreationState, streetName: string) => {
    state.streetName = streetName
  }
}
