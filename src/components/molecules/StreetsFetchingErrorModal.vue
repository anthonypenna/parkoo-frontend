<template>
  <TryAgainModal @tryagain="onTryAgain">
    <h2>Oops!</h2>
    <p>Parkoo had trouble while connecting to the server</p>
    <p>Try again later</p>
  </TryAgainModal>
</template>

<script lang="ts">
import Vue from "vue";
import TryAgainModal from "@/components/molecules/TryAgainModal.vue";

export default Vue.extend({
  name: "StreetsFetchingErrorModal",
  components: { TryAgainModal },
  methods: {
    onTryAgain() {
      this.$emit("tryagain");
    },
  },
});
</script>
