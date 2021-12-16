<template>
  <transition name="banner">
    <div
      v-if="visible"
      :class="{
        banner: true,
        'banner--success': success,
        'banner--error': error
      }">
      {{ text }}
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { BannerType, BANNER_TIMEOUT } from '@/constants/banner'
import { mapBannerGetters, mapBannerMutations } from '@/store/banner/helpers'

export default Vue.extend({
  name: 'Banner',

  computed: {
    ...mapBannerGetters(['text', 'type', 'visible']),

    success(): boolean {
      return this.type === BannerType.Success
    },

    error(): boolean {
      return this.type === BannerType.Error
    }
  },

  methods: {
    ...mapBannerMutations(['setVisible']),

    removeTimeout() {
      clearTimeout(this.timeoutID as NodeJS.Timeout)
    }
  },

  data() {
    return {
      timeoutID: undefined as NodeJS.Timeout | undefined
    }
  },

  destroyed() {
    this.removeTimeout()
  },

  watch: {
    visible() {
      if (!this.visible) {
        this.removeTimeout()
        return
      }

      this.timeoutID = setTimeout(() => {
        this.removeTimeout()
        this.setVisible(false)
      }, BANNER_TIMEOUT)
    }
  }
})
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
