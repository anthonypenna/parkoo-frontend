import { Street } from '@/models/Street'
import { StreetsState } from '@/models/StreetsState'

export const mutations = {
  setStreets: (state: StreetsState, streets: Street[]) => {
    state.streets = streets
  }
}
