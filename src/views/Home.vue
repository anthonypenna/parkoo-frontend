<template>
  <div></div>
</template>

<script lang="ts">
import { GEOLOCATION_ROUTE_NAME } from '@/constants/route'
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  mounted() {
    this.$router.onReady(() => {
      this.$router.push({ name: GEOLOCATION_ROUTE_NAME })
    })
  }
})
</script>
