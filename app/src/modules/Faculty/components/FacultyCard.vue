<script lang="ts" setup>
import { computed } from "vue";
import { FacultyModel } from "@/modules/Faculty/models/FacultyModel";

const props = defineProps<{
  model: FacultyModel
}>();

const classes = computed(() => {
  return {
    "faculty-card_1": props.model.id === 1,
    "faculty-card_2": props.model.id === 2,
    "faculty-card_3": props.model.id === 3,
    "faculty-card_4 ": props.model.id === 4,
  };
});

</script>

<template>
  <div class="faculty-card" :class="classes">
    <img class="faculty-card__image" :src="model.emblem" />
  </div>
</template>

<style lang="scss">
.faculty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $gray-850;
  border-radius: $border-radius-md;
  border-width: 2px;
  border-style: solid;

  &_1 {
    border-color: $stroke-red;
  }

  &_2 {
    border-color: $stroke-brown;
  }

  &_3 {
    border-color: $stroke-blue;
  }

  &_4 {
    border-color: $stroke-green;
  }
}
</style>
