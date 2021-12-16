import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'

export const mutations = {
  setText: (state: BannerState, text: string) => {
    state.text = text
  },

  setType: (state: BannerState, type: BannerType) => {
    state.type = type
  },

  setVisible: (state: BannerState, visible: boolean) => {
    state.visible = visible
  }
}
