<script setup lang="ts">
import { ref, watch } from "vue";
import Service from "@/service";
import FacultyCard from "@/modules/Faculty/components/FacultyCard.vue";
import BaseScore from "@/modules/Base/components/BaseScore.vue";
import ProfileCard from "@/modules/Profile/components/ProfileCard.vue";
import { FacultyType } from "@/modules/Base/models/FacultyType";
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import { TopUserModel } from "@/modules/Faculty/models/FacultyTopUsersModel";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { useFacultyStore } from "@/modules/Faculty/stores/FacultyStore";

const $userStore = useUserStore();
const $facultyStore = useFacultyStore();

const DEFAULT_FACULTY_ID = 1;
const TOP_COUNT = 10;

const activeTabId = ref<FacultyType>($userStore.user?.facultyID || DEFAULT_FACULTY_ID);
const profileList = ref<TopUserModel[]>([]);
const facultyScore = ref(0);
const isLoading = ref(true);

const switchTab = (id: FacultyType): void => {
  if (id === activeTabId.value) return;

  activeTabId.value = id;
};
const fetch = async (): Promise<void> => {
  isLoading.value = true;

  const currentFaculty = $userStore.user?.facultyID || DEFAULT_FACULTY_ID;
  const topUsersResponse = await Service.faculty.getTopUsers(currentFaculty, TOP_COUNT);
  if (topUsersResponse.result) {
    facultyScore.value = topUsersResponse.result.countPoints;
    profileList.value = [...topUsersResponse.result.users];
  }

  isLoading.value = false;
};

watch(
  () => activeTabId.value,
  async (newValue) => {
    isLoading.value = true;

    const topUsersResponse = await Service.faculty.getTopUsers(newValue, TOP_COUNT);
    if (topUsersResponse.result) {
      facultyScore.value = topUsersResponse.result.countPoints;
      profileList.value = [...topUsersResponse.result.users];
    }

    isLoading.value = false;
  }
);

fetch();
</script>

<template>
  <main class="rating-page">
    <h1 class="rating-page__title">Рейтинг</h1>

    <div class="rating-page__tabs">
      <button
        class="rating-tab"
        type="button"
        v-for="(item, index) in $facultyStore.list"
        :key="`tab-${index}`"
        :class="{ 'rating-tab_active': activeTabId === item.id, [`rating-tab_faculty_${item.id}`]: item.id }"
        @click="switchTab(item.id)"
      >
        <FacultyCard class="rating-tab__faculty" :model="item" />
        <span class="rating-tab__text">
          {{ item.title }}
        </span>
      </button>
    </div>

    <div class="rating-page__score">
      Общее количество баллов:
      <BaseScore :count="facultyScore" />
    </div>

    <div v-if="!isLoading" class="rating-page__list">
      <div class="rating-page__item" v-for="(item, index) in profileList" :key="`profile-${index}`">
        <div class="rating-page__item-number" :class="{ 'rating-page__item-number_user': item.user.id === $userStore.user?.id }">
          {{ item.position }}
        </div>

        <ProfileCard class="rating-page__item-profile" :model="item.user" />
      </div>
    </div>

    <ProfileBack />
  </main>
</template>

<style lang="scss">
.rating-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 17px 0 64px;

  &__title {
    @include label-16-bold;
    text-align: center;
  }

  &__list {
    margin: 16px 0;
  }

  &__tabs {
    @include hide-scroll;
    margin-top: 24px;
    display: flex;
    gap: 8px;
    overflow-x: auto;
  }

  &__score {
    @include body-16;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 32px;
    background-color: $black-100;
    border-radius: $border-radius-md;
    color: $gray-100;
  }

  &__item {
    display: flex;
    align-items: center;
  }

  &__item-number {
    @include label-14;
    margin-right: 12px;
    color: $gray-100;

    &_user {
      color: $purple-100;
    }
  }

  &__item-profile {
    flex-grow: 1;
  }

  .rating-tab {
    filter: grayscale(1);

    &__faculty {
      width: 76px;
      height: 76px;
    }

    &__text {
      @include label-10;
      display: block;
      margin-top: 4px;
      color: $gray-100;
      text-align: center;
    }

    &_active {
      filter: none;

      &.rating-tab {
        &_faculty {
          &_1 {
            .rating-tab__text {
              color: $stroke-red;
            }
          }

          &_2 {
            .rating-tab__text {
              color: $stroke-brown;
            }
          }

          &_3 {
            .rating-tab__text {
              color: $stroke-blue;
            }
          }

          &_4 {
            .rating-tab__text {
              color: $stroke-green;
            }
          }
        }
      }
    }
  }
}
</style>
