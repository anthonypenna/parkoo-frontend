<template>
  <Modal>
    <slot />
    <div class="prompt-modal__button-container">
      <Button @click.native="onClose">
        <slot name="close" />
      </Button>
      <div class="prompt-modal__button-separator"></div>
      <Button theme="primary" @click.native="onConfirm">
        <slot name="confirm" />
      </Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/atoms/Modal.vue'
import Button from '@/components/atoms/Button.vue'

export default Vue.extend({
  name: 'PromptModal',
  components: { Modal, Button },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('confirm')
    }
  }
})
</script>

<style lang="scss" scoped>
.prompt-modal {
  &__button-container {
    display: flex;
  }

  &__button-separator {
    margin: 0 0.5rem;
  }
}
</style>
