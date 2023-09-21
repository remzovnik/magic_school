<script setup lang="ts">
import { computed } from "vue";
import { UserTaskStatusType } from "@/modules/Tasks/models/TaskModel";

interface IDataSetItem {
  description: string;
  image: string;
}

const DATA_SET = {
  ["done"]: {
    description: "Ты успешно сдал экзамен! В ближайшее время состоится церемония вручения дипломов👨‍🎓",
    image: "/images/reward.svg",
  },

  ["time over"]: {
    description: "Увы! Экзамен провален. Зато ты лучше узнал ЯRUS и мы этому рады",
    image: "/images/lock.svg",
  },
};

const props = defineProps<{ status?: UserTaskStatusType }>();

const currentData = computed<IDataSetItem | null>(() => {
  if (props.status && ["done", "time over"].includes(props.status)) {
    return DATA_SET[props.status];
  }

  return null;
});
</script>

<template>
  <div v-if="currentData" class="exam-result">
    <div class="exam-result__title">Выполненные задания</div>
    <div class="exam-result__description">{{ currentData?.description }}</div>

    <img class="exam-result__reward" :src="currentData?.image" />
  </div>
</template>

<style lang="scss">
.exam-result {
  position: relative;
  padding: 12px 78px 12px 12px;
  border-radius: $border-radius-md;
  background-color: $black-100;

  &__title {
    @include body-16;
    color: $gray-100;
  }

  &__description {
    @include body-14;
    margin-top: 4px;
    color: $gray-600;
  }

  &__reward {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
  }
}
</style>
