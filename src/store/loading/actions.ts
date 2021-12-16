import { LoadingState } from '@/models/LoadingState'
import { ActionContext } from 'vuex'

export const actions = {
  startLoading: (store: ActionContext<LoadingState, unknown>) => {
    store.commit('setShowLoading', true)
  },

  stopLoading: (store: ActionContext<LoadingState, unknown>) => {
    store.commit('setShowLoading', false)
  }
}
