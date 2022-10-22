<script setup>
import { computed } from "vue";

const props = defineProps({
  historicalClosePrice: {
    type: Object,
    required: true,
  }
})

const arrowClass = computed(() => props.historicalClosePrice.diff > 0 ? "arrow-up" : "arrow-down");
const arrowSymbol = computed(() => props.historicalClosePrice.diff > 0 ? "&#8593" : "&#8595");
</script>

<template>
  <div class="close-price">
    <div :class="['arrow',arrowClass]" v-html="arrowSymbol"></div>
    <div class="diff">
      {{ props.historicalClosePrice.diff.toFixed(6) }}
    </div>
    <div class="rate">
      ({{ props.historicalClosePrice.rate.toFixed(6) }} %)
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/variables/_index.scss";

.close-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow {
  &-up {
    color: $success;
  }

  &-down {
    color: $danger;
  }
}
</style>