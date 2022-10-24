<script setup>
import { computed } from "vue";

const props = defineProps({
  historicalClosePrice: {
    type: Object,
    required: true,
  }
})

const diff = computed(() => props.historicalClosePrice.diff.toFixed(6));
const rate = computed(() => `${props.historicalClosePrice.rate.toFixed(6)}%`);
const textColorClass = computed(() => props.historicalClosePrice.diff > 0 ? "text-success" : "text-danger");
const arrowSymbol = computed(() => props.historicalClosePrice.diff > 0 ? "&#8593" : "&#8595");
</script>

<template>
  <div class="close-price">
    <div :class="['arrow',textColorClass]" v-html="arrowSymbol"></div>
    <div :class="textColorClass">
      {{ diff }}
    </div>
    <div :class="textColorClass">
      ({{ rate }})
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/local/_index.scss";

.close-price {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  @include breakpoint("xl") {
    font-size: 18px;
  }
  @include breakpoint("2xl") {
    font-size: 20px;
  }
}

.text {
  &-success {
    color: $success;
  }

  &-danger {
    color: $danger;
  }
}
</style>