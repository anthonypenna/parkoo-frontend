<template>
  <button v-bind="$attrs" :class="`button button--${theme}`">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',

  props: {
    theme: {
      default: 'secondary',
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  max-width: 295px;
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;

  &--primary {
    background: #ff9979;
    color: #fff;
  }

  &--secondary {
    background: #f1f1f1;
    color: #000;
  }
}
</style>
