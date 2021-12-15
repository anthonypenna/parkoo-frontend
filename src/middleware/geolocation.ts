import Vue from 'vue'
import { mapGetters } from 'vuex'

export const geolocationMiddleware = Vue.extend({
  computed: {
    ...mapGetters(['hasFetchedGeolocation']),
  },
  beforeMount() {
    if (!this.hasFetchedGeolocation) {
      this.$router.push({ name: 'Geolocation' })
      return
    }
  },
})
