<script setup>
const props = defineProps({
  alert: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div :class="['alert',`alert-${props.alert.type}`]">
    {{ props.alert.message }}
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/local/_index.scss";

.alert {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  color: $white;
  border-radius: 9999px;
  font-size: 13px;
  @include breakpoint("lg") {
    font-size: 14px;
  }
  @include breakpoint("2xl") {
    font-size: 15px;
    padding: 10px 15px;
  }
}

@each $key, $value in $colors {
  .alert-#{$key} {
    background-color: rgba($value, .95);
  }
}
</style>