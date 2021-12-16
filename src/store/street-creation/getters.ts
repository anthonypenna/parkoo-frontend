import { StreetCreationState } from '@/models/StreetCreationState'

export const getters = {
  streetCleaningDays: (state: StreetCreationState) => state.streetCleaningDays,
  streetID: (state: StreetCreationState) => state.streetID,
  streetLat: (state: StreetCreationState) => state.streetLat,
  streetLng: (state: StreetCreationState) => state.streetLng,
  streetName: (state: StreetCreationState) => state.streetName
}
