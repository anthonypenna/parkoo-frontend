import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('streetCreation')

export const mapStreetCreationActions = helpers.mapActions
export const mapStreetCreationGetters = helpers.mapGetters
export const mapStreetCreationMutations = helpers.mapMutations
export const mapStreetCreationState = helpers.mapState
