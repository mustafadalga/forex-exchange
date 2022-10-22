<script setup>
import CustomSelect from "@/components/CustomSelect.vue";

const props = defineProps({
  liveCurrencyList: {
    type: Array,
    required: true
  },
  fromCurrency: {
    type: Object,
    default: () => ({})
  },
  toCurrency: {
    type: Object,
    default: () => ({})
  }
});


</script>
<template>
  <div class="select-group">
    <CustomSelect class="custom-select"
                  :selectedOption="props.fromCurrency"
                  :clearable="false"
                  @selected="$emit('inputFromCurrency',$event)"
                  :options="props.liveCurrencyList"/>

    <CustomSelect class="custom-select"
                  :selectedOption="props.toCurrency"
                  :clearable="false"
                  @selected="$emit('inputToCurrency',$event)"
                  :options="props.liveCurrencyList"/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/local/_index.scss";

.select-group {
  display: grid;
  align-content: center;
  width: 100%;
  gap: 15px;
  @include breakpoint("lg") {
    gap: 30px;
  }
}

.custom-select {
  @include breakpoint("md") {
    max-width: 400px;
  }
}
</style>