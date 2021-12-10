<template>
  <Modal>
    <slot />
    <Button @click.native="onConfirm">
      <slot name="button" />
    </Button>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/atoms/Modal.vue";
import Button from "@/components/atoms/Button.vue";

export default Vue.extend({
  name: "AlertModal",
  components: { Modal, Button },
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
  },
});
</script>
