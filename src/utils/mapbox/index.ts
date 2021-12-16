import { MAPBOX_CENTER } from '@/constants/mapbox'
import { getLastKnownPosition } from '@/services/geolocation'
import { LngLatLike } from 'mapbox-gl'
import { convertPositionToLngLatLike } from '../position'

export function getInitialCenter(): LngLatLike {
  const lastKnownPosition = getLastKnownPosition()
  return lastKnownPosition ? convertPositionToLngLatLike(lastKnownPosition) : MAPBOX_CENTER
}
