<script setup lang="ts">
import Service from '@/service'
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import { computed, ref } from "vue";
import RouteModel from "@/modules/Base/models/RouteModel";
import { FacultyModel } from "@/modules/Faculty/models/FacultyModel"
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { useFacultyStore } from "@/modules/Faculty/stores/FacultyStore";

const $userStore = useUserStore();
const $facultyStore = useFacultyStore();

const currentFaculty = computed<FacultyModel>(() => {
  return $facultyStore.list?.find(item => item.id === $userStore.user?.facultyID) || new FacultyModel()
})

const routeName = computed<RouteModel | undefined>(() => {
  return { name: "profile" };
});
</script>

<template>
  <main class="faculty-page">
    <img class="faculty-page__image" :src="currentFaculty?.emblem" />
    <h1 class="faculty-page__title">
      Распределительная ушанка выбрала для тебя факультет {{ currentFaculty?.title }}
    </h1>
    <div class="faculty-page__description">
      {{ currentFaculty?.description }}
    </div>
    <BaseButton class="faculty-page__link" :route="routeName" is-full-width>
      Далее
    </BaseButton>
  </main>
</template>

<style lang="scss">
.faculty-page {
  padding: 116px 0 8px;
  display: flex;
  flex-direction: column;


  &__link {
    margin-top: auto;
  }

  &__image {
    margin-bottom: 32px;
    align-self: center;
    width: 216px;
  }

  &__title {
    @include headline-18;
    margin-bottom: 8px;
    color: $gray-100;
  }

  &__description {
    @include body-16;
    margin-bottom: 16px;
    color: $gray-100;
  }
}
</style>
