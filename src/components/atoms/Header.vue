<template>
  <header v-once class="header">
    <h1 class="header__title">parkoo</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 16px rgba($color: #000000, $alpha: 0.1);
  z-index: 100;

  &__title {
    margin: 0;
    padding: 8px 0;
    font-size: 32px;
    font-weight: normal;
    text-align: center;

    @media screen and (min-width: 768px) {
      padding: 32px 0;
    }
  }
}
</style>
