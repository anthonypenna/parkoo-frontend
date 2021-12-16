import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('mapbox')

export const mapMapboxActions = helpers.mapActions
export const mapMapboxGetters = helpers.mapGetters
export const mapMapboxMutations = helpers.mapMutations
export const mapMapboxState = helpers.mapState
