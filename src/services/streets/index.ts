import { API_BASEURL } from '@/constants/api'
import { CreateStreetResponse } from '@/models/CreateStreetResponse'
import { GetStreetsResponse } from '@/models/GetStreetsResponse'
import { Street } from '@/models/Street'

export function getStreets(): Promise<GetStreetsResponse> {
  return fetch(`${API_BASEURL}/streets`)
    .then(response => response.json())
    .then(json => json as GetStreetsResponse)
}

export function createStreet(street: Street): Promise<CreateStreetResponse> {
  return fetch(`${API_BASEURL}/street`, {
    body: JSON.stringify(street),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  })
    .then(response => response.json())
    .then(json => json as CreateStreetResponse)
}
