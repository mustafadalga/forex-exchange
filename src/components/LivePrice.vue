<script setup>
import getSymbolFromCurrency from 'currency-symbol-map'
import { computed, ref, watch } from "vue";

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
const unit = computed(() => getSymbolFromCurrency(props.unit));
const price = computed(() => Number(props.price.bid).toFixed(5));
let timeoutID;


watch(() => props.price.bid, () => handleChangesAnimation());


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
      {{ unit }} {{ price }}
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