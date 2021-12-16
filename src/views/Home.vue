<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  mounted() {
    this.$router.push({ name: 'Geolocation' })
  }
})
</script>
