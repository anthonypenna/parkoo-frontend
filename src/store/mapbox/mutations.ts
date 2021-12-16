import { MapboxState } from '@/models/MapboxState'
import { Map } from 'mapbox-gl'

export const mutations = {
  setMap: (state: MapboxState, map: Map | null) => {
    state.map = map
  }
}
