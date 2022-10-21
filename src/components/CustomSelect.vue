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
            label="title"
            :modelValue="selectedItem.id"
            @update:modelValue="$emit('input',$event ? $event : {})"/>
</template>

<style scoped>
:deep(.vs__dropdown-toggle) {
  padding: 8px;
}
</style>