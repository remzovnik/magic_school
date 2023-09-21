<script setup lang="ts">
import { ref, computed } from "vue";
import Service from "@/service";
import TaskCard from "@/modules/Tasks/components/TaskCard.vue";
import TaskProgress from "@/modules/Tasks/components/TaskProgress.vue";
import { TaskModel } from "@/modules/Tasks/models/TaskModel";
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import { useExamStore } from "@/modules/Exam/stores/ExamStore";
import ExamResult from "@/modules/Exam/components/ExamResult.vue";

const $examStore = useExamStore();

const taskList = ref<TaskModel[]>([]);
const countCompleted = ref<number>(0);
const isExamEnabled = ref<boolean>(false);

const isLoading = ref(true);

const fetch = async (): Promise<void> => {
  isLoading.value = true;

  const tasksResponse = await Service.tasks.getTasks();

  if (tasksResponse.result) {
    taskList.value = [...tasksResponse.result.tasks];
    countCompleted.value = tasksResponse.result.countCompleted;
    isExamEnabled.value = tasksResponse.result.isExamEnabled;

    if (tasksResponse.result.examTask) {
      $examStore.examTask = tasksResponse.result.examTask;
    }
  }

  isLoading.value = false;
};

const completeTask = (): void => {
  countCompleted.value++;
};

const isExamEnded = computed<boolean>(() => {
  return $examStore.examTask?.userTaskStatus ? !!["done", "time over"].includes($examStore.examTask?.userTaskStatus) : false;
});

fetch();
</script>

<template>
  <main class="task-page">
    <h1 class="task-page__title">Задания</h1>

    <TaskProgress v-if="!isExamEnded" :is-exam-enabled="isExamEnabled" :count="countCompleted" />

    <div class="task-page__list">
      <ExamResult v-if="isExamEnded" :status="$examStore.examTask?.userTaskStatus" />

      <TaskCard
        class="task-page__card"
        v-for="(item, index) in taskList"
        :key="`task-${index}`"
        :model="item"
        @completed="completeTask"
      />
    </div>

    <ProfileBack />
  </main>
</template>

<style lang="scss">
.task-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 17px 0 64px;

  &__title {
    @include label-16-bold;
    text-align: center;
  }

  &__list {
    margin-top: 22px;
  }

  &__card {
    margin-top: 8px;
  }
}
</style>
