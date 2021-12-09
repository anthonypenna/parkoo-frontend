import { Position } from '@/models/Position'
import { LngLatLike } from 'mapbox-gl'

export function convertPositionToLngLatLike(position: Position): LngLatLike {
  return [position.lng, position.lat]
}
