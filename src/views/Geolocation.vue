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
  computed: { ...mapGetters('loading', ['showLoading']) },
  methods: {
    ...mapActions('loading', ['stopLoading']),
    ...mapActions('user', ['getPosition']),
    ...mapMutations('user', ['setHasFetchedGeolocation'])
  },
  mounted() {
    this.$router.onReady(() => {
      this.getPosition()
        .then(() => {
          this.setHasFetchedGeolocation(true)
          this.$router.push({ name: 'Streets' })
        })
        .catch(() => {
          this.stopLoading()
        })
    })
  }
})
</script>
