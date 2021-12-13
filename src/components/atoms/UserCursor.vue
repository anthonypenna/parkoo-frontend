<template>
  <div v-once class="user-cursor"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { USER_CURSOR_NAME } from "@/constants/user-cursor";

export default Vue.extend({
  name: USER_CURSOR_NAME,

  props: {
    lat: {
      default: 0,
      type: Number,
    },

    lng: {
      default: 0,
      type: Number,
    },
  },
});
</script>

<style lang="scss" scoped>
.user-cursor {
  width: 32px;
  height: 32px;
  background: #ff9979;
  border: solid 4px #f1f1f1;
  border-radius: 50%;
  animation: pulse 1s linear infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 #ff9979;
  }

  80% {
    box-shadow: 0 0 32px #ff9979;
  }

  100% {
    box-shadow: 0 0 0 #ff9979;
  }
}
</style>
