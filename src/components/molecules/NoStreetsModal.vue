<template>
  <PromptModal @close="onClose" @confirm="onAddStreet">
    <h2>Oops!</h2>
    <p>Mmmh, it looks like nobody has added any streets yet!</p>
    <p>To be the first, just click on the "Add street" button below.</p>
    <template #close>Close</template>
    <template #confirm>Add street</template>
  </PromptModal>
</template>

<script lang="ts">
import Vue from "vue";
import PromptModal from "@/components/molecules/PromptModal.vue";

export default Vue.extend({
  name: "NoStreetsModal",
  components: { PromptModal },
  methods: {
    onClose() {
      this.$emit("close");
    },
    onAddStreet() {
      this.$emit("addstreet");
    },
  },
});
</script>
