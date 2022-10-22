<template>
  <div class="header">
    <h1 class="header__title">Forex Exchange</h1>
    <p class="header__description">Check out the current price for a currency pair</p>
  </div>
</template>


<style lang="scss" scoped>
@import "@/scss/local/_index.scss";

.header {
  display: grid;
  gap: clamp(8px, 1vw, 16px);

  &__title {
    font-weight: bold;
    color: black;
    font-size: 20px;
    @include breakpoint("lg") {
      font-size: 28px;
    }
    @include breakpoint("xl") {
      font-size: 35px;
    }
    @include breakpoint("2xl") {
      font-size: 40px;
    }
  }

  &__description {
    color: rgb(75 85 99);
    font-weight: bold;
    font-size: 15px;
    @include breakpoint("xl") {
      font-size: 18px;
    }
    @include breakpoint("2xl") {
      font-size: 20px;
    }
  }
}
</style>