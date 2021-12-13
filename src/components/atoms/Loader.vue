<template>
  <Fade>
    <div class="loader">
      <div class="loader__ball loader__ball--one"></div>
      <div class="loader__ball loader__ball--two"></div>
      <div class="loader__ball loader__ball--three"></div>
    </div>
  </Fade>
</template>

<script lang="ts">
import Vue from "vue";
import Fade from "@/components/atoms/Fade.vue";

export default Vue.extend({
  name: "Loader",
  components: { Fade },
});
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;

  &__ball {
    width: 16px;
    height: 16px;
    margin: 0 8px;
    background: #ff9979;
    border-radius: 50%;
  }

  &__ball--one {
    animation: jump 1s ease-in-out 0s infinite;
  }

  &__ball--two {
    animation: jump 1s ease-in-out 0.1s infinite;
  }

  &__ball--three {
    animation: jump 2s ease-in-out 0.2s infinite;
  }
}

@keyframes jump {
  50% {
    opacity: 0.2;
    transform: scale(0.5) translateY(16px);
  }
}
</style>
