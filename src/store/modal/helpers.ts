import { createNamespacedHelpers } from 'vuex'

const helpers = createNamespacedHelpers('modal')

export const mapModalActions = helpers.mapActions
export const mapModalGetters = helpers.mapGetters
export const mapModalMutations = helpers.mapMutations
export const mapModalState = helpers.mapState
