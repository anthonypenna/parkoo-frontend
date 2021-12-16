import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('loading')

export const mapLoadingActions = helpers.mapActions
export const mapLoadingGetters = helpers.mapGetters
export const mapLoadingMutations = helpers.mapMutations
export const mapLoadingState = helpers.mapState
