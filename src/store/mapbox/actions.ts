import { MapboxState } from '@/models/MapboxState'
import { Position } from '@/models/Position'
import { reverseGeocode } from '@/services/geocoding'
import { until } from '@/utils/async'
import { ActionContext } from 'vuex'

export const actions = {
  getStreetDataFromPosition: async (store: ActionContext<MapboxState, unknown>, position: Position) => {
    const accessToken = store.getters['accessToken']
    const [error, response] = await until(() => reverseGeocode(position.lat, position.lng, accessToken))
    if (error || !response) throw error
    return response.features[0]
  }
}
