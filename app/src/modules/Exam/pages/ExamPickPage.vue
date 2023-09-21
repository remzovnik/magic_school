<script setup lang="ts">
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import Service from "@/service";
import router from "@/router";
import RouteModel from "@/modules/Base/models/RouteModel";
import { useExamStore } from "@/modules/Exam/stores/ExamStore";

const $examStore = useExamStore();

const examRouteName: RouteModel = { name: "exam" };
const tasksRouteName: RouteModel = { name: "tasks" };

const pickTicket = async (event): Promise<void> => {
  event.target.classList.add("exam-pick-page__paper-animation");

  setTimeout(async () => {
    try {
      const response = await Service.exam.ticketSelect();
      $examStore.examTask = response.result;
      router.push(examRouteName);
    } catch {
      router.push(tasksRouteName);
    }
  }, 2000);
};

if ($examStore.examTask) {
  router.push(tasksRouteName);
}
</script>

<template>
  <main class="exam-pick-page">
    <h1 class="exam-pick-page__title">Экзамен</h1>
    <div class="exam-pick-page__wrapper">
      <div class="exam-pick-page__subtitile">Выбери билет</div>
      <img class="exam-pick-page__wand" src="/images/exam_wand.png" />
      <img class="exam-pick-page__ink" src="/images/exam_ink.png" />
      <img class="exam-pick-page__pen" src="/images/exam_pen.png" />
      <img class="exam-pick-page__paper-1" src="/images/exam_paper_1.png" @click="pickTicket" />
      <img class="exam-pick-page__paper-2" src="/images/exam_paper_2.png" @click="pickTicket" />
      <img class="exam-pick-page__paper-3" src="/images/exam_paper_3.png" @click="pickTicket" />
    </div>

    <ProfileBack />
  </main>
</template>

<style lang="scss">
.exam-pick-page {
  position: relative;
  height: 100vh;
  padding: 17px 0 0;
  display: flex;
  flex-direction: column;

  &__title {
    @include label-16-bold;
    text-align: center;
  }

  &__subtitile {
    text-align: center;
    color: $gray-900;
    font-family: "Gogol", serif;
    font-weight: 400;
    font-size: 32px;
    line-height: 24px;
  }

  &__wrapper {
    margin: 24px calc((100vw - 100% + $container-padding) / -2);
    flex-grow: 1;
    padding-top: 16px;
    background: url("/images/exam_bg.jpg") no-repeat 50% 50% / cover;
  }

  &__wand {
    position: absolute;
    top: 17%;
    left: 24%;
    z-index: 2;
  }

  &__paper-1 {
    position: absolute;
    top: 21%;
    left: 5%;
    z-index: 1;
    cursor: pointer;
    pointer-events: initial;
  }

  &__paper-2 {
    position: absolute;
    top: 34%;
    left: 37%;
    z-index: 1;
    cursor: pointer;
    pointer-events: initial;
  }

  &__paper-3 {
    position: absolute;
    top: 53%;
    left: 7%;
    z-index: 1;
    cursor: pointer;
    pointer-events: initial;
  }

  &__paper-animation {
    transform: rotate(1360deg) scale(1.5);
    transition: transform ease-in 2s;
  }

  &__ink {
    position: absolute;
    top: 42%;
    left: -1%;
    z-index: 2;
  }

  &__pen {
    position: absolute;
    top: 66%;
    left: 49%;
    z-index: 2;
  }
}
</style>
