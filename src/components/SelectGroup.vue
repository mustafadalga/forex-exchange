<script setup>
import CustomSelect from "@/components/CustomSelect.vue";

const props = defineProps({
  liveCurrenciesList: {
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
                  @input="$emit('inputFromCurrency',$event)"
                  :options="props.liveCurrenciesList"/>

    <CustomSelect class="custom-select"
                  :selectedOption="props.toCurrency"
                  @input="$emit('inputToCurrency',$event)"
                  :options="props.liveCurrenciesList"/>
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
  @include breakpoint("lg") {
    max-width: 300px;
  }
}
</style>