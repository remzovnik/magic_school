<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    name: "",
    size: 20,
  }
);

const classes = computed<object>(() => {
  return {
    [`svg-icon_size_${props.size}`]: props.size,
  };
});
</script>

<template>
  <span class="base-icon" :style="`width: ${size}px; height: ${size}px;`">
    <svg>
      <use :xlink:href="`#icon-${name}`" />
    </svg>
  </span>
</template>

<style lang="scss">
.base-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentcolor;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
