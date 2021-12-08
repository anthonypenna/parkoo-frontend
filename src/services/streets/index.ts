import { Street } from '@/models/Street'

interface GetStreetsResponse {
  streets: Street[]
}

export function getStreets(): Promise<GetStreetsResponse> {
  return fetch('http://localhost:3000/api/v1/streets')
    .then(response => response.json())
    .then(json => json as GetStreetsResponse)
}
