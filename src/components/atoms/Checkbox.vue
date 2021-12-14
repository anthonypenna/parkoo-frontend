<template>
  <div class="checkbox">
    <label class="checkbox__label" :for="name">
      <slot name="label" />
    </label>
    <div class="checkbox__input">
      <input
        v-bind="$attrs"
        type="checkbox"
        :name="name"
        :checked="checked"
        @change="onChange"
      />
      <Checkmark v-show="checked" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Checkmark from "@/components/atoms/Checkmark.vue";

export default Vue.extend({
  name: "Checkbox",
  components: { Checkmark },
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    name: {
      default: "",
      type: String,
    },
    checked: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    onChange(event: { target: HTMLInputElement }) {
      this.$emit("change", event.target.checked);
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  width: min-content;
  display: flex;
  flex-direction: row-reverse;

  &__label {
    font-weight: bold;
  }

  &__input {
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    border: solid 2px #e4e4e4;
    border-radius: 5px;
  }

  input {
    position: absolute;
    top: -2.5px;
    left: -4px;
    width: 20px;
    height: 20px;
    opacity: 0;
  }
}
</style>
