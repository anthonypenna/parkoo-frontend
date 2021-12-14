import { DateState } from './DateState'
import { MapboxState } from './MapboxState'
import { StreetsState } from './StreetsState'
import { UserState } from './UserState'

export interface RootState {
  date: DateState
  mapbox: MapboxState
  streets: StreetsState
  user: UserState
}
