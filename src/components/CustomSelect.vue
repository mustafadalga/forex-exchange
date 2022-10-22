<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  selectedOption: {
    type: Object,
    default: () => ({})
  },
  placeholder: {
    type: String,
    default: "Select Item From List"
  },
});
const selectedItem = ref({});
const watchOptions = {
  immediate: true,
}

watch(() => props.selectedOption, (newValue) => selectedItem.value = newValue, watchOptions);
</script>
<template>
  <v-select :options="props.options"
            class="custom-select"
            label="title"
            :modelValue="selectedItem.title"
            @option:selected="$emit('selected',$event ? $event : {})"/>
</template>

<style lang="scss" scoped>
@import "@/scss/local/_index.scss";

:deep(.vs__dropdown-toggle) {
  padding: 8px;
}

.custom-select :deep(*) {
  font-size: 12px;
  @include breakpoint("md") {
    font-size: 15px;
  }
  @include breakpoint("2xl") {
    font-size: 16px;
  }
}
</style>