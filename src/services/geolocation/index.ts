import { LAST_KNOWN_POSITION_KEY } from '@/constants/local-storage'
import { Position } from '@/models/Position'

export function getGeolocationPosition(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export function saveLastKnownPosition(position: Position): void {
  localStorage.setItem(LAST_KNOWN_POSITION_KEY, JSON.stringify(position))
}

export function getLastKnownPosition(): Position | null {
  const position = localStorage.getItem(LAST_KNOWN_POSITION_KEY)
  return position ? JSON.parse(position) : null
}
