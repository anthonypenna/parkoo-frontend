import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('streets')

export const mapStreetsActions = helpers.mapActions
export const mapStreetsGetters = helpers.mapGetters
export const mapStreetsMutations = helpers.mapMutations
export const mapStreetsState = helpers.mapState
