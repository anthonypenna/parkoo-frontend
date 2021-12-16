import { MapboxState } from '@/models/MapboxState'

export const getters = {
  accessToken: (state: MapboxState) => state.accessToken,
  center: (state: MapboxState) => state.center,
  map: (state: MapboxState) => state.map,
  theme: (state: MapboxState) => state.theme,
  zoom: (state: MapboxState) => state.zoom
}
