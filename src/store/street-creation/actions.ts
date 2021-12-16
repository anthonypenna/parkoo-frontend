import { StreetCreationState } from '@/models/StreetCreationState'
import { createStreet } from '@/services/streets'
import { until } from '@/utils/async'
import { ActionContext } from 'vuex'

export const actions = {
  resetFields: (store: ActionContext<StreetCreationState, unknown>) => {
    store.commit('setStreetCleaningDays', {
      '0': false,
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false
    })
    store.commit('setStreetID', '')
    store.commit('setStreetLat', 0)
    store.commit('setStreetLng', 0)
    store.commit('setStreetName', '')
  },

  createStreet: async (store: ActionContext<StreetCreationState, unknown>) => {
    const cleaningDays = store.getters['streetCleaningDays']
    const id = store.getters['streetID']
    const lat = store.getters['streetLat']
    const lng = store.getters['streetLng']
    const street = { cleaningDays, id, lat, lng }

    const [error, response] = await until(() => createStreet(street))
    if (error) throw error
    if (!response) return
  }
}
