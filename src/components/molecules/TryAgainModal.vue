<template>
  <AlertModal @confirm="onTryAgain">
    <slot />
    <template #button>Try again</template>
  </AlertModal>
</template>

<script lang="ts">
import Vue from "vue";
import AlertModal from "@/components/molecules/AlertModal.vue";

export default Vue.extend({
  name: "TryAgainModal",
  components: { AlertModal },
  methods: {
    onTryAgain() {
      this.$emit("tryagain");
    },
  },
});
</script>
