<template>
  <StreetsFetchingErrorModal v-show="!showLoading" />
</template>

<script lang="ts">
import Vue from 'vue'
import StreetsFetchingErrorModal from '@/components/molecules/StreetsFetchingErrorModal.vue'
import { mapGetters } from 'vuex'
import { geolocationMiddleware } from '@/middleware/geolocation'
import { MAP_ROUTE_NAME } from '@/constants/route'
import { mapLoadingActions } from '@/store/loading/helpers'
import { mapStreetsActions } from '@/store/streets/helpers'
import { mapUserMutations } from '@/store/user/helpers'
import { until } from '@/utils/async'

export default Vue.extend({
  name: 'Streets',
  mixins: [geolocationMiddleware],
  components: { StreetsFetchingErrorModal },
  computed: { ...mapGetters('loading', ['showLoading']) },
  methods: {
    ...mapLoadingActions(['stopLoading']),
    ...mapStreetsActions(['getStreets']),
    ...mapUserMutations(['setHasFetchedStreets'])
  },
  mounted() {
    this.$router.onReady(async () => {
      const [error] = await until(this.getStreets)

      if (error) {
        this.stopLoading()
        return
      }

      this.setHasFetchedStreets(true)
      this.$router.push({ name: MAP_ROUTE_NAME })
    })
  }
})
</script>
