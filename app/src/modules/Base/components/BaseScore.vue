<script setup lang="ts">
import { computed } from "vue";

type BaseScoreIconType = "coin" | "wand" | "deluminator";

const props = withDefaults(
  defineProps<{
    count: number;
    icon?: BaseScoreIconType;
  }>(),
  {
    icon: "coin",
  }
);

const currentImage = computed(() => {
  switch (props.icon) {
    case "coin": {
      return `/images/coin.png`;
    }

    case "deluminator": {
      return `/images/deluminator.svg`;
    }

    case "wand": {
      return `/images/wand.svg`;
    }

    default: {
      return `/images/coin.png`;
    }
  }
});
</script>

<template>
  <div class="base-score">
    <div class="base-score__count">{{ props.count }}</div>
    <img class="base-score__coin" :src="currentImage" />
  </div>
</template>

<style lang="scss">
.base-score {
  display: flex;
  align-items: center;

  &__count {
    @include label-16;
    margin-right: 4px;
    color: $gray-100;
  }

  &__coin {
    width: 20px;
    height: 20px;
  }
}
</style>
