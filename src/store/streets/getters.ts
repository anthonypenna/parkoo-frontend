import { StreetsState } from '@/models/StreetsState'
import { isStreetCleanedTomorrow } from '@/utils/street'

export const getters = {
  streets: (state: StreetsState) => state.streets,
  hasStreets: (state: StreetsState) => state.streets.length > 0,
  isStreetCleanedTomorrow: () => isStreetCleanedTomorrow
}
