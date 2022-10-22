<script setup>
const props = defineProps({
  fromCurrency: {
    type: String,
    default: ""
  },
  toCurrency: {
    type: String,
    default: ""
  }
})
</script>


<template>
  <div class="selected-currencies">
    <div class="symbols">
      <div :class="`currency-flag currency-flag-${props.fromCurrency.toLowerCase()}`"></div>
      <div :class="`currency-flag currency-flag-${props.toCurrency.toLowerCase()}`"></div>
    </div>
    <div class="currency-names">
      {{ props.fromCurrency }} / {{ props.toCurrency }}
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "currency-flags/dist/currency-flags.min.css";
@import "@/scss/local/_index.scss";

.selected-currencies {
  display: grid;
  gap: 10px;
}

.symbols, .currency-names {
  display: flex;
  align-items: center;
}

.symbols {
  gap: 8px;
}

.currency-names {
  text-transform: capitalize;
  color: $black;
  font-weight: bold;
  font-size: 18px;
  @include breakpoint("lg") {
    font-size: 25px;
  }
}

.currency-flag {
  @include breakpoint("lg") {
    width: 48px;
    height: 24px;
  }
}
</style>