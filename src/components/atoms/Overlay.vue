<template>
  <Fade>
    <div class="overlay">
      <slot />
    </div>
  </Fade>
</template>

<script lang="ts">
import Vue from "vue";
import Fade from "@/components/atoms/Fade.vue";

export default Vue.extend({
  name: "Overlay",
  components: { Fade },
});
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 10;
}
</style>
