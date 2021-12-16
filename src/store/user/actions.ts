import { UserState } from '@/models/UserState'
import { getGeolocationPosition, saveLastKnownPosition } from '@/services/geolocation'
import { until } from '@/utils/async'
import { ActionContext } from 'vuex'

export const actions = {
  getPosition: async (store: ActionContext<UserState, unknown>) => {
    const [error, position] = await until(getGeolocationPosition)
    if (error) throw error
    if (!position) return
    store.commit('setLat', position.coords.latitude)
    store.commit('setLng', position.coords.longitude)
    saveLastKnownPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
  }
}
