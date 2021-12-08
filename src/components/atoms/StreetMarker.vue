<template>
  <svg
    width="32"
    height="48"
    viewBox="0 0 32 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="`filter: drop-shadow(0 4px 16px ${color}A0)`"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32 16C32 19.014 31.1666 21.8333 29.7178 24.2401L16 48L2.28223 24.2401C0.833362 21.8333 0 19.014 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "StreetMarker",

  props: {
    cleanedTomorrow: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    color() {
      return this.cleanedTomorrow ? "#FF7373" : "#1DDC3C";
    },
  },
});
</script>
