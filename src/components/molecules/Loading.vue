<template>
  <Overlay>
    <Loader />
  </Overlay>
</template>

<script lang="ts">
import Vue from "vue";
import Overlay from "@/components/atoms/Overlay.vue";
import Loader from "@/components/atoms/Loader.vue";

export default Vue.extend({
  name: "Loading",
  components: {
    Overlay,
    Loader,
  },
});
</script>
