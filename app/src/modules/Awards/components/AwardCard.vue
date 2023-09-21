<script setup lang="ts">
import { computed } from "vue";
import { AwardModel } from "@/modules/Awards/models/AwardModel";
import { AwardStatusType } from "@/modules/Awards/models/AwardModel";

const props = withDefaults(
  defineProps<{
    model: AwardModel;
  }>(),
  { model: () => new AwardModel() }
);

const classes = computed<object>(() => {
  return {
    "award-card_achieved": props.model.status === "received",
  };
});
</script>

<template>
  <div class="award-card" :class="classes">
    <img class="award-card__image" :src="model.image" />

    <h3 class="award-card__title">{{ model.title }}</h3>

    <div class="award-card__description">{{ model.description }}</div>
  </div>
</template>

<style lang="scss">
.award-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 12px 4px;
  background-color: $black-100;
  border-radius: $border-radius-md;
  text-align: center;

  &__image {
    width: 75px;
    height: 72px;
    filter: grayscale(1);
  }

  &__title {
    @include body-14-medium;
    display: flex;
    align-items: center;
    height: 32px;
    font-weight: 500;
    margin-top: 8px;
    color: $gray-100;
    word-break: break-word;
  }

  &__description {
    @include body-10;
    margin-top: 4px;
    color: $gray-750;
  }

  &_achieved {
    .award-card__image {
      filter: grayscale(0);
    }
  }
}
</style>
