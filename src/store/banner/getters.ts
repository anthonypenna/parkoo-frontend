import { BannerState } from '@/models/BannerState'

export const getters = {
  text: (state: BannerState) => state.text,
  type: (state: BannerState) => state.type,
  visible: (state: BannerState) => state.visible
}
