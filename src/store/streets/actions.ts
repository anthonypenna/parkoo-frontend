import { StreetsState } from '@/models/StreetsState'
import { getStreets } from '@/services/streets'
import { until } from '@/utils/async'
import { ActionContext } from 'vuex'

export const actions = {
  getStreets: async (store: ActionContext<StreetsState, unknown>) => {
    const [error, response] = await until(getStreets)
    if (error) throw error
    store.commit('setStreets', response?.streets)
  }
}
