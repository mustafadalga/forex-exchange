<script setup>
import getSymbolFromCurrency from 'currency-symbol-map'

const props = defineProps({
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="live-price">
    {{ getSymbolFromCurrency(props.unit) }} {{ props.price.bid.toFixed(5) }}
  </div>
</template>


<style lang="scss" scoped>
@import "@/scss/local/_index.scss";
.live-price {
  text-align: end;
  font-weight: bold;
  font-size: 18px;
  color: $black;
  @include breakpoint("lg") {
    font-size: 25px;
  }
}
</style>