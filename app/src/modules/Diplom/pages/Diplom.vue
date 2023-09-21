<script lang="ts" setup>
import { ref } from "vue";
import Service from "@/service";
import { EGradeType } from "@/modules/Diplom/models/GradeModel";
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import { useUserStore } from "@/modules/Profile/stores/UserStore";

const $userStore = useUserStore();

const isLoading = ref(true);
const currentGrade = ref<EGradeType>();

const fetch = async (): Promise<void> => {
  isLoading.value = true;

  const response = await Service.diplom.getGrade();

  if (response.result) {
    currentGrade.value = response.result.grade;
  }

  isLoading.value = false;
};

fetch();
</script>

<template>
  <div class="diplom-page">
    <h1 class="diplom-page__title">Диплом</h1>

    <template v-if="!isLoading">
      <div class="diplom-page__input">
        {{ `${$userStore.user?.name} ${$userStore.user?.surname} ` }}
      </div>
      <img :src="`/images/diplom-${currentGrade}.svg`" />
    </template>

    <ProfileBack />
  </div>
</template>

<stlye lang="scss">
.diplom-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 17px 0 64px;

  &__title {
    @include label-16-bold;
    margin-bottom: 1.6rem;
    text-align: center;
  }

  &__input {
    @include label-16;
    position: absolute;
    top: 290px;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    padding: 8px;
    border-radius: $border-radius-sm;
    background-color: rgba(255, 255, 255, 0.2);
    text-align: center;
  }
}
</stlye>
