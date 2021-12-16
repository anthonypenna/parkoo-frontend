import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('banner')

export const mapBannerActions = helpers.mapActions
export const mapBannerGetters = helpers.mapGetters
export const mapBannerMutations = helpers.mapMutations
export const mapBannerState = helpers.mapState
