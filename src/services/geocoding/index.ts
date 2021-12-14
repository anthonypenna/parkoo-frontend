import { GeocodeResponse } from '@/models/GeocodeResponse'

export function reverseGeocode(
  lat: number,
  lng: number,
  accessToken: string
): Promise<GeocodeResponse> {
  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&access_token=${accessToken}`
  )
    .then(response => response.json())
    .then(json => json as GeocodeResponse)
}
