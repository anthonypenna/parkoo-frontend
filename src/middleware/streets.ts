import { STREETS_ROUTE_NAME } from '@/constants/route'
import { mapUserGetters } from '@/store/user/helpers'
import Vue from 'vue'

export const streetsMiddleware = Vue.extend({
  computed: {
    ...mapUserGetters(['hasFetchedStreets'])
  },
  beforeMount() {
    if (!this.hasFetchedStreets) {
      this.$router.onReady(() => {
        this.$router.push({ name: STREETS_ROUTE_NAME })
      })
      return
    }
  }
})
