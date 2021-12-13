<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/atoms/Header.vue";

export default Vue.extend({
  name: "App",
  components: { Header },
});
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
