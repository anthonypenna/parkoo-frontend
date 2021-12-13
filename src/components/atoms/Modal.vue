<template>
  <Fade>
    <div class="modal">
      <slot />
    </div>
  </Fade>
</template>

<script lang="ts">
import { Map } from "mapbox-gl";
import Vue from "vue";
import Fade from "@/components/atoms/Fade.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",

  components: { Fade },

  computed: {
    ...mapGetters("mapbox", ["map"]),
  },

  mounted() {
    const map = this.map as Map;
    map.dragPan.disable();
    map.scrollZoom.disable();
  },

  destroyed() {
    const map = this.map as Map;
    map.dragPan.enable();
    map.scrollZoom.enable();
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 560px;
  width: calc(100% - (56px + 2rem));
  padding: 32px 28px 16px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba($color: #000000, $alpha: 0.1);
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>
