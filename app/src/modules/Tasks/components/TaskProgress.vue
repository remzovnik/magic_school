<script setup lang="ts">
import { computed } from "vue";
import RouteModel from "@/modules/Base/models/RouteModel";
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import router from "@/router";
import { useExamStore } from "@/modules/Exam/stores/ExamStore";

const $examStore = useExamStore();

const props = defineProps<{
  count: number;
  isExamEnabled: boolean;
}>();

const examRouteName: RouteModel = { name: "exam" };
const examPickRouteName: RouteModel = { name: "examPick" };

const currentColor = computed<string>(() => {
  if (props.count < 5) {
    return "#FF5454";
  }

  if (props.count >= 5 && props.count < 12) {
    return "#FFAB07";
  }

  if (props.count >= 12) {
    return "#5BB63D";
  }

  return "#FFF";
});

const currentShiftStyle = computed<string>(() => {
  return `transform: translateX(${-100 + Math.floor((props.count / 15) * 100)}%)`;
});

const examHandler = () => {
  if ($examStore.examTask) {
    router.push(examRouteName);
  } else {
    router.push(examPickRouteName);
  }
};
</script>

<template>
  <div class="task-page-progress">
    <div class="task-page-progress__title">Выполненные задания</div>

    <div class="task-page-progress__bar">
      <svg
        class="task-page-progress__fill"
        fill="none"
        :style="currentShiftStyle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 319 18"
      >
        <rect width="319" height="18" rx="9" fill="#3D3D3D" />
        <g clip-path="url(#a)">
          <mask id="b" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="1" y="1" width="318" height="16">
            <path d="M1.002 9a8 8 0 0 1 8-8h309v16h-309a8 8 0 0 1-8-8Z" :fill="currentColor" />
          </mask>
          <g clip-path="url(#c)" mask="url(#b)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M-25.128-3.248-55.1 26.724l-5.475-5.476 29.972-29.971 5.475 5.475Zm14.986 0-29.972 29.972-5.475-5.476 29.971-29.971 5.476 5.475ZM-25.13 26.724 4.842-3.248-.633-8.723l-29.971 29.971 5.475 5.476ZM19.828-3.248l-29.971 29.972-5.475-5.476L14.353-8.723l5.475 5.475ZM4.843 26.724 34.814-3.248 29.34-8.723-.633 21.248l5.476 5.476ZM49.8-3.248 19.83 26.724l-5.476-5.476L44.325-8.723 49.8-3.248Zm14.986 29.972L94.758-3.248l-5.475-5.475L59.31 21.248l5.475 5.476Zm74.929-29.972-29.972 29.972-5.475-5.476 29.971-29.971 5.476 5.475Zm14.986 29.972 29.971-29.972-5.475-5.475-29.971 29.971 5.475 5.476Zm74.928-29.972-29.972 29.972-5.475-5.476 29.972-29.971 5.475 5.475Zm14.985 29.972 29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476Zm74.929-29.972-29.971 29.972-5.475-5.476 29.971-29.971 5.475 5.475Zm14.986 29.972L364.5-3.248l-5.475-5.475-29.972 29.971 5.476 5.476ZM64.786-3.248 34.814 26.724l-5.475-5.476L59.311-8.723l5.475 5.475Zm14.986 29.972 29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476ZM154.7-3.248l-29.971 29.972-5.475-5.476 29.971-29.971 5.475 5.475Zm14.986 29.972 29.971-29.972-5.475-5.475-29.972 29.971 5.476 5.476Zm74.929-29.972-29.972 29.972-5.475-5.476L239.14-8.723l5.475 5.475ZM259.6 26.724l29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476Zm74.929-29.972-29.971 29.972-5.475-5.476 29.971-29.971 5.475 5.475Zm14.985 29.972 29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476ZM79.772-3.248 49.8 26.724l-5.475-5.476L74.297-8.723l5.475 5.475Zm14.986 29.972L124.73-3.248l-5.475-5.475-29.972 29.971 5.475 5.476Zm74.928-29.972-29.971 29.972-5.475-5.476 29.971-29.971 5.475 5.475Zm14.985 29.972 29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476Zm74.93-29.972-29.972 29.972-5.475-5.476 29.972-29.971 5.475 5.475Zm14.985 29.972 29.972-29.972-5.476-5.475-29.971 29.971 5.475 5.476Zm74.929-29.972-29.971 29.972-5.476-5.476L344.04-8.723l5.475 5.475ZM364.5 26.724l29.972-29.972-5.475-5.475-29.972 29.971 5.475 5.476Z"
              :fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id="a"><rect x="1" y="1" width="317" height="16" rx="8" :fill="currentColor" /></clipPath>
          <clipPath id="c"><path :fill="currentColor" d="M-22.754-2.13h379.405v22.26H-22.754z" /></clipPath>
        </defs>
      </svg>
    </div>

    <BaseButton v-if="isExamEnabled" class="task-page-progress__exam" @click="examHandler">Сдать экзамен</BaseButton>
  </div>
</template>

<style lang="scss">
.task-page-progress {
  margin-top: 32px;
  border-radius: $border-radius-md;
  padding: 12px;
  background-color: $black-100;

  &__title {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: $gray-100;
  }

  &__bar {
    overflow: hidden;
    margin-top: 12px;
    height: 18px;
    border-radius: $border-radius-md;
    background-color: $gray-850;
  }

  &__fill {
    transform: translateX(-100%);
    transition: transform $trs-forward;
  }

  &__exam {
    margin-top: 12px;
  }
}
</style>
