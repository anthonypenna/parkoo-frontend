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
