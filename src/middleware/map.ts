import Vue from 'vue'
import { mapGetters } from 'vuex'

export const mapMiddleware = Vue.extend({
  computed: { ...mapGetters(['isReadyToLoadMap']) },
  beforeMount() {
    if (!this.isReadyToLoadMap) {
      this.$router.push({ name: 'Geolocation' })
      return
    }
  }
})
