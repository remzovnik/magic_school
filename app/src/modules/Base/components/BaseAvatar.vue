<script setup lang="ts">
import { computed, StyleValue } from "vue";

const props = defineProps<{
  image?: string;
  size: number;
  isOutlined?: boolean;
}>();

const styles = computed<StyleValue>(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
  };
});

const classes = computed<object>(() => {
  return {
    "base-avatar_outlined": props.isOutlined,
  };
});
</script>

<template>
  <div class="base-avatar" :style="styles" :class="classes">
    <img :src="image" class="base-avatar__image" alt="Аватар" />
  </div>
</template>

<style lang="scss">
.base-avatar {
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 100%;
  background: $gray-850;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &_outlined {
    border: 1px solid $gray-300;
  }
}
</style>
