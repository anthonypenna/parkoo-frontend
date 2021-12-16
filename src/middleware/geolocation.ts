import { GEOLOCATION_ROUTE_NAME } from '@/constants/route'
import { mapUserGetters } from '@/store/user/helpers'
import Vue from 'vue'

export const geolocationMiddleware = Vue.extend({
  computed: {
    ...mapUserGetters(['hasFetchedGeolocation'])
  },
  beforeMount() {
    if (!this.hasFetchedGeolocation) {
      this.$router.onReady(() => {
        this.$router.push({ name: GEOLOCATION_ROUTE_NAME })
      })
      return
    }
  }
})
