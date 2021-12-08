import { STREET_MARKER_NAME } from '@/constants/street-marker'
import { MapChild } from '@/models/MapChild'

export function isStreetMarker(component: Vue): component is MapChild {
  return component.$options.name === STREET_MARKER_NAME
}
