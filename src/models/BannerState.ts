import { BannerType } from '@/constants/banner'

export interface BannerState {
  text: string
  type: BannerType
  visible: boolean
}
