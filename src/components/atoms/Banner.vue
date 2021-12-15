<template>
  <transition name="banner">
    <div
      v-if="showBanner"
      v-html="bannerData"
      :class="{
        banner: true,
        'banner--success': success,
        'banner--error': error,
      }"
    />
  </transition>
</template>

<script lang="ts">
import {
  BannerType,
  BANNER_TIMEOUT,
  CLOSED_BANNER_STATE,
} from "@/constants/banner";
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "Banner",

  computed: {
    ...mapGetters(["showBanner", "bannerType", "bannerData"]),

    success(): boolean {
      return this.bannerType === BannerType.Success;
    },
    error(): boolean {
      return this.bannerType === BannerType.Error;
    },
  },

  methods: {
    ...mapMutations(["setBannerState"]),
  },

  data() {
    return {
      timeoutID: undefined as NodeJS.Timeout | undefined,
    };
  },

  destroyed() {
    clearTimeout(this.timeoutID as NodeJS.Timeout);
  },

  watch: {
    showBanner() {
      if (!this.showBanner) {
        clearTimeout(this.timeoutID as NodeJS.Timeout);
        return;
      }

      this.timeoutID = setTimeout(() => {
        clearTimeout(this.timeoutID as NodeJS.Timeout);
        this.setBannerState(CLOSED_BANNER_STATE);
      }, BANNER_TIMEOUT);
    },
  },
});
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  top: 32px;
  left: 0;
  width: 100%;
  padding-top: 1.5rem;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #fff;
  z-index: 10;

  &--error {
    background: rgba($color: #ff7373, $alpha: 0.6);
    box-shadow: 0 4px 16px rgba($color: #ff7373, $alpha: 0.4);
  }

  &--success {
    background: rgba($color: #1ddc3c, $alpha: 0.6);
    box-shadow: 0 4px 16px rgba($color: #1ddc3c, $alpha: 0.4);
  }
}

.banner-enter-active,
.banner-leave-active {
  transition: transform 1s ease;
}

.banner-enter {
  transform: translateY(-100%);
}

.banner-enter-to {
  transform: translateY(0);
}

.banner-leave {
  transform: translateY(0);
}

.banner-leave-to {
  transform: translateY(-100%);
}
</style>
