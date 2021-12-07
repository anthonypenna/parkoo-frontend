import { LngLatLike, Map } from 'mapbox-gl'

export interface MapboxState {
  accessToken: string
  center: LngLatLike
  theme: string
  zoom: number
  map: Map | null
}
