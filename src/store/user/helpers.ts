import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('user')

export const mapUserActions = helpers.mapActions
export const mapUserGetters = helpers.mapGetters
export const mapUserMutations = helpers.mapMutations
export const mapUserState = helpers.mapState
