<template>
  <Fade>
    <Button v-bind="$attrs" class="add-button" theme="primary">+</Button>
  </Fade>
</template>

<script lang="ts">
import Vue from "vue";
import Fade from "@/components/atoms/Fade.vue";
import Button from "@/components/atoms/Button.vue";

export default Vue.extend({
  name: "AddButton",
  components: { Fade, Button },
});
</script>

<style lang="scss" scoped>
.add-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba($color: #000000, $alpha: 0.2);
  font-size: 32px;
  line-height: 100%;
}
</style>
