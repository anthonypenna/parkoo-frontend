import { GEOLOCATION_ROUTE_NAME } from '@/constants/route'
import { mapUserGetters } from '@/store/user/helpers'
import Vue from 'vue'

export const mapMiddleware = Vue.extend({
  computed: {
    ...mapUserGetters(['isReady'])
  },
  beforeMount() {
    if (!this.isReady) {
      this.$router.onReady(() => {
        this.$router.push({ name: GEOLOCATION_ROUTE_NAME })
      })
      return
    }
  }
})
