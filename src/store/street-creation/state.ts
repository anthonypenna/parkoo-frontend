import { StreetCreationState } from '@/models/StreetCreationState'

export const state = (): StreetCreationState => ({
  streetCleaningDays: {
    '0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false
  },
  streetID: '',
  streetLat: 0,
  streetLng: 0,
  streetName: ''
})
