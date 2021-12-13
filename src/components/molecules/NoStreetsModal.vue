<template>
  <PromptModal @close="onClose" @confirm="onAddStreet">
    <h2>Oh oh!</h2>
    <p>It looks like nobody has added any <strong>streets</strong> yet!</p>
    <p>
      To get started, just click on the <strong>Add street</strong> button
      below.
    </p>
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
