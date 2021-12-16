<template>
  <div id="app">
    <Header />
    <Banner v-show="visible" />
    <Loading v-show="showLoading" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/atoms/Header.vue'
import Loading from '@/components/molecules/Loading.vue'
import Banner from '@/components/atoms/Banner.vue'
import { mapBannerGetters } from './store/banner/helpers'
import { mapLoadingGetters } from './store/loading/helpers'

export default Vue.extend({
  name: 'App',
  components: { Header, Loading, Banner },
  computed: { ...mapBannerGetters(['visible']), ...mapLoadingGetters(['showLoading']) }
})
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  line-height: 33px;
  text-align: center;
}

p {
  max-width: 80%;
  margin: 1rem auto;
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}
</style>
