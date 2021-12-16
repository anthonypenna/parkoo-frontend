import Vue from 'vue'
import { mapGetters } from 'vuex'

export const streetsMiddleware = Vue.extend({
  computed: { ...mapGetters(['hasFetchedStreets']) },
  beforeMount() {
    if (!this.hasFetchedStreets) {
      this.$router.push({ name: 'Streets' })
      return
    }
  }
})
