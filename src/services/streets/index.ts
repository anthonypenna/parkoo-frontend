import { API_BASEURL } from '@/constants/api'
import { Street } from '@/models/Street'

interface GetStreetsResponse {
  streets: Street[]
}

export function getStreets(): Promise<GetStreetsResponse> {
  return fetch(`${API_BASEURL}/streets`)
    .then(response => response.json())
    .then(json => json as GetStreetsResponse)
}

interface CreateStreetResponse {
  street: Street
}

export function createStreet(street: Street): Promise<CreateStreetResponse> {
  return fetch(`${API_BASEURL}/street`, {
    body: JSON.stringify(street),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
    .then(response => response.json())
    .then(json => json as CreateStreetResponse)
}
