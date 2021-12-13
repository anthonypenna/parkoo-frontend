
<template>
  <Modal>
    <h2>Oh oh!</h2>
    <p>
      Parkoo needs access to your <strong>location</strong> in order to work
      correctly.
    </p>
    <p>
      Please check your <strong>settings</strong>, refresh the page and try
      again
    </p>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/atoms/Modal.vue";

export default Vue.extend({
  name: "GeolocationErrorModal",
  components: { Modal },
});
</script>
