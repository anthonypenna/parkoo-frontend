import { BannerType } from '@/constants/banner'

export interface BannerState {
  visible: boolean
  type: BannerType
  text: string
}
