<script setup>
import getSymbolFromCurrency from 'currency-symbol-map'
import { ref, watch } from "vue";

const props = defineProps({
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Object,
    required: true
  }
});

const showAnimation = ref(false);
let timeoutID;


watch(() => props.price, () => handleChangesAnimation());


async function handleChangesAnimation () {
  if (timeoutID) {
    clearTimeout(timeoutID);
    showAnimation.value = false;
  }

  setTimeout(() => showAnimation.value = true, 0);
  timeoutID = setTimeout(() => showAnimation.value = false, 200);
}
</script>

<template>
  <div class="live-price">
    <span :class="showAnimation ? 'animation-fluctuation':''">
      {{ getSymbolFromCurrency(props.unit) }} {{ props.price.bid.toFixed(5) }}
    </span>
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

@keyframes fluctuation {
  0% {
    color: $black;
  }
  25% {
    color: rgba($black, .75);
  }
  50% {
    color: rgba($black, .50);
  }
  75% {
    color: rgba($black, .25);
  }
  100% {
    color: rgba($black, 0);
  }
}

.animation-fluctuation {
  animation: fluctuation 200ms;
}
</style>