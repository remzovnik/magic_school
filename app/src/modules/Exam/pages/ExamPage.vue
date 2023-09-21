<script setup lang="ts">
import { ref, computed, inject, onMounted, watch } from "vue";
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import { durationFormatter } from "@/utils/durationFormatter";
import { TaskModel } from "@/modules/Tasks/models/TaskModel";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import Service from "@/service";
import { EModalTypes } from "@/modules/Base/components/BaseModal/EModalTypes.enum";
import { useExamStore } from "@/modules/Exam/stores/ExamStore";
import BaseScore from "@/modules/Base/components/BaseScore.vue";
import BaseIcon from "@/modules/Base/components/BaseIcon.vue";
import BaseButton from "@/modules/Base/components/BaseButton.vue";

const emitter: any = inject("emitter");

const $examStore = useExamStore();
const $userStore = useUserStore();

const model = ref<TaskModel>(new TaskModel());
const currentRemainingSeconds = ref<number>(0);
const currentUserTaskStatus = ref<string>($examStore.examTask?.userTaskStatus || "selected");
const timer = ref();
const isLoading = ref(false);

const currentFormattedRemainingTime = computed<string>(() => {
  return durationFormatter(currentRemainingSeconds.value);
});

const startTask = async (): Promise<void> => {
  const response = await Service.exam.start(model.value.alias);

  if (response.result) {
    currentUserTaskStatus.value = "processing";

    currentRemainingSeconds.value = response.result.remainingSeconds || 0;

    if (response.result.remainingSeconds) {
      timer.value = setInterval(() => {
        currentRemainingSeconds.value--;
      }, 1000);
    }
  }
};

const checkTask = async (): Promise<void> => {
  isLoading.value = true;

  const response = await Service.exam.check(model.value.alias);

  if (response.result) {
    currentUserTaskStatus.value = response.result.status;

    if (["done", "super_done"].includes(response.result.status) && $userStore.user?.points) {
      $userStore.user.points += model.value.points;
      emitter.emit("openModal", { type: EModalTypes.CONGRATULATIONS, props: { type: response.result.status } });
    }
  }

  isLoading.value = false;
};

onMounted(() => {
  if ($examStore.examTask) {
    model.value = $examStore.examTask;
    currentRemainingSeconds.value = $examStore.examTask.remainingSeconds || 0;

    if (model.value.remainingSeconds) {
      timer.value = setInterval(() => {
        currentRemainingSeconds.value--;
      }, 1000);
    }
  }
});

watch(
  () => currentRemainingSeconds.value,
  (newValue) => {
    if (newValue === 0) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
);
</script>

<template>
  <main class="exam-page">
    <h1 class="exam-page__title">Экзамен</h1>
    <div class="exam-page__wrapper">
      <div class="exam-page__paper">
        <div v-if="model.taskStatus === 'active' && currentUserTaskStatus === 'done'" class="exam-page__done">
          <BaseIcon name="done" />
        </div>

        <div v-else class="exam-page__reward">
          <BaseScore :count="+model.points" icon="coin" />
        </div>

        <h1 class="exam-page__task-title">{{ model.title }}</h1>

        <div class="exam-page__task-description">
          {{ model.description }}
        </div>

        <button v-if="currentRemainingSeconds" class="exam-page__timer" type="button">
          <BaseIcon name="timer" class="exam-page__timer-icon" />
          {{ currentFormattedRemainingTime }}
        </button>

        <BaseButton
          v-if="model.taskStatus === 'active' && currentUserTaskStatus === 'selected'"
          class="exam-page__button"
          size="small"
          @click="startTask"
        >
          Выполнить</BaseButton
        >

        <BaseButton
          v-if="model.taskStatus === 'active' && currentUserTaskStatus === 'processing'"
          class="exam-page__button"
          size="small"
          icon="check"
          is-check
          @click="checkTask"
          >Проверить</BaseButton
        >

        <template v-if="model.taskStatus === 'active' && currentUserTaskStatus === 'fail'">
          <BaseButton class="exam-page__button" type="secondary" size="small" is-error>Не все условия выполнены </BaseButton>

          <BaseButton class="exam-page__button" size="small" is-check @click="checkTask" :is-loading="isLoading"
            >Проверить</BaseButton
          >
        </template>
      </div>
    </div>
    <ProfileBack />
  </main>
</template>

<style lang="scss">
.exam-page {
  position: relative;
  height: 100vh;
  padding: 17px 0 0;
  display: flex;
  flex-direction: column;

  &__title {
    @include label-16-bold;
    text-align: center;
  }

  &__wrapper {
    margin: 24px calc((100vw - 100% + $container-padding) / -2);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-grow: 1;
    padding: 78px 0 60px;
    background: url("/images/exam_bg.jpg") no-repeat 50% 50% / cover;

    @media (max-width: 375px) {
      margin: 24px -15px 0;
      width: calc(100vw + 30px);
    }
  }

  &__paper {
    position: relative;
    margin: 0 -47px;
    width: 524px;
    height: 468px;
    padding: 64px 75px 80px;
    background: url("/images/paper.png") no-repeat 50% 50% / 524px 470px;
  }

  &__reward {
    display: inline-flex;
    padding: 2px 4px 2px 8px;
    border-radius: 40px;
    background: $purple-200;
  }

  &__task-title {
    margin-top: 16px;
    color: $gray-900;
    font-family: "Gogol", serif;
    font-weight: 400;
    font-size: 28px;
    line-height: 24px;
    letter-spacing: 2%;
  }

  &__task-description {
    @include body-16;
    margin-top: 8px;
    color: $gray-900;
  }

  &__button {
    margin-top: 16px;
  }

  &__timer {
    @include label-14;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 80px;
    padding: 4px 8px;
    background-color: $gray-850;
    color: $gray-100;
    border-radius: $border-radius-sm;
  }

  &__timer-icon {
    color: $gray-600;
  }
}
</style>
