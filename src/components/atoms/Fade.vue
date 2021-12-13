<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
