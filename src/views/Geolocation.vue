<template>
  <GeolocationErrorModal v-show="!showLoading" />
</template>

<script lang="ts">
import Vue from 'vue'
import GeolocationErrorModal from '@/components/molecules/GeolocationErrorModal.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'Geolocation',
  components: { GeolocationErrorModal },
  computed: {
    ...mapGetters(['showLoading'])
  },
  methods: {
    ...mapActions('user', ['getPosition']),
    ...mapMutations(['setShowLoading', 'setHasFetchedGeolocation'])
  },
  mounted() {
    this.getPosition()
      .then(() => {
        this.setHasFetchedGeolocation(true)
        this.$router.push({ name: 'Streets' })
      })
      .catch(() => {
        this.setShowLoading(false)
      })
  }
})
</script>
