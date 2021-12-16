import { LoadingState } from '@/models/LoadingState'

export const mutations = {
  setShowLoading: (state: LoadingState, showLoading: boolean) => {
    state.showLoading = showLoading
  }
}
