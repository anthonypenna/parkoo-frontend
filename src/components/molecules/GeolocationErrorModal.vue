
<template>
  <TryAgainModal @tryagain="onTryAgain">
    <h2>Oops!</h2>
    <p>
      Parkoo needs access to your location <br />in order to work correctly.
    </p>
    <p>Please check your settings and try again</p>
  </TryAgainModal>
</template>

<script lang="ts">
import Vue from "vue";
import TryAgainModal from "@/components/molecules/TryAgainModal.vue";

export default Vue.extend({
  name: "GeolocationErrorModal",
  components: { TryAgainModal },
  methods: {
    onTryAgain() {
      this.$emit("tryagain");
    },
  },
});
</script>
