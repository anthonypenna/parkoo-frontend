import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { ActionContext } from 'vuex'

export const actions = {
  showErrorBanner: (store: ActionContext<BannerState, unknown>, text: string) => {
    store.commit('setText', text)
    store.commit('setType', BannerType.Error)
    store.commit('setVisible', true)
  },

  showSuccessBanner: (store: ActionContext<BannerState, unknown>, text: string) => {
    store.commit('setText', text)
    store.commit('setType', BannerType.Success)
    store.commit('setVisible', true)
  }
}
