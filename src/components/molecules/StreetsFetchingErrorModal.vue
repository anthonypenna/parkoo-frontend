<template>
  <Modal>
    <h2>Oh oh!</h2>
    <p>
      Seems like <strong>Parkoo</strong> couldn't connect to the
      <strong>server</strong>!
    </p>
    <p>
      We're working on it, so feel free to <strong>try again</strong> later.
    </p>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/atoms/Modal.vue";

export default Vue.extend({
  name: "StreetsFetchingErrorModal",
  components: { Modal },
});
</script>
