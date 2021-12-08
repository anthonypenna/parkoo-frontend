<template>
  <transition name="fade">
    <div class="overlay">
      <slot />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  transition: opacity 1s ease;
  z-index: 10;
}

.fade-leave-active {
  opacity: 0;
}
</style>
