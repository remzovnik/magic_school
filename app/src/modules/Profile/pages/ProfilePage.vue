<script setup lang="ts">
import { computed, ref } from "vue";
import Service from "@/service";
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import BaseShare from "@/modules/Base/components/BaseShare.vue";
import BaseIcon from "@/modules/Base/components/BaseIcon.vue";
import BaseScore from "@/modules/Base/components/BaseScore.vue";
import BaseAvatar from "@/modules/Base/components/BaseAvatar.vue";
import RouteModel from "@/modules/Base/models/RouteModel";
import ProfileCard from "@/modules/Profile/components/ProfileCard.vue";
import AwardCard from "@/modules/Awards/components/AwardCard.vue";
import { TopUserModel } from "@/modules/Faculty/models/FacultyTopUsersModel";
import { AwardModel } from "@/modules/Awards/models/AwardModel";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { useFacultyStore } from "@/modules/Faculty/stores/FacultyStore";
import { FacultyModel } from "@/modules/Faculty/models/FacultyModel";
import BaseModal from "@/modules/Base/components/BaseModal/BaseModal.vue";

const $userStore = useUserStore();
const $facultyStore = useFacultyStore();

const DEFAULT_FACULTY_ID = 1;

const topUsers = ref<TopUserModel[]>([]);
const lastAwards = ref<AwardModel[]>([]);
const isLoading = ref(true);
const isModalHidden = ref<boolean>(Boolean(localStorage.getItem("isModalHidden")));

const hideModal = (): void => {
  isModalHidden.value = true;
  localStorage.setItem("isModalHidden", "true");
};

const ratingRouteName = computed<RouteModel>(() => {
  return { name: "rating" };
});

const awardsRouteName = computed<RouteModel>(() => {
  return { name: "awards" };
});

const taskRouteName = computed<RouteModel>(() => {
  return { name: "tasks" };
});

const diplomRouteName = computed<RouteModel>(() => {
  return { name: "diplom" };
});

const currentFaculty = computed<FacultyModel>(() => {
  return $facultyStore.list?.find((item) => item.id === $userStore.user?.facultyID) || new FacultyModel();
});

const fetch = async (): Promise<void> => {
  isLoading.value = true;

  const topUsersResponse = await Service.faculty.getTopUsers($userStore.user?.facultyID || DEFAULT_FACULTY_ID, 3);
  if (topUsersResponse.result) {
    topUsers.value = [...topUsersResponse.result.users];
  }

  const awardsResponse = await Service.awards.getAwards();
  if (awardsResponse.result) {
    lastAwards.value = [...awardsResponse.result.slice(0, 3)];
  }

  isLoading.value = false;
};

fetch();
</script>

<template>
  <main class="profile-page">
    <header class="profile-header">
      <div class="profile-header__wrapper">
        <BaseAvatar :image="$userStore.user?.photo" :size="72" />

        <div class="profile-header__text">
          <h1 class="profile-header__name">{{ $userStore.user?.name }} {{ $userStore.user?.surname }}</h1>

          <div class="profile-header__nickname">@{{ $userStore.user?.nickname }}</div>

          <div class="profile-header__balance">
            <BaseScore :count="$userStore.user?.points || 0" icon="coin" />
            <BaseScore :count="$userStore.user?.magicWandCount || 0" icon="wand" />
            <BaseScore :count="$userStore.user?.deluminatorCount || 0" icon="deluminator" />
          </div>
        </div>

        <img class="profile-header__emblem" :src="currentFaculty.emblem" />
      </div>

      <BaseButton class="profile-header__link" size="small" :route="taskRouteName" is-full-width>Задания</BaseButton>

      <BaseButton class="profile-header__link" size="small" :route="diplomRouteName" is-full-width>Мой диплом</BaseButton>
    </header>

    <template v-if="!isLoading">
      <section class="profile-page__section profile-section">
        <router-link class="profile-section__header" :to="ratingRouteName">
          <h2 class="profile-section__title">Рейтинг моего факультета</h2>
          <BaseIcon name="arrow-right" />
        </router-link>

        <div class="profile-section__list">
          <ProfileCard v-for="(item, index) in topUsers" :key="`profile-${index}`" :model="item.user" />
        </div>
      </section>

      <section class="profile-page__section profile-section">
        <router-link class="profile-section__header" :to="awardsRouteName">
          <h2 class="profile-section__title">Награды</h2>
          <BaseIcon name="arrow-right" />
        </router-link>

        <div class="profile-section__list profile-section__list_awards">
          <AwardCard v-for="(item, index) in lastAwards" :key="`award-${index}`" :model="item" />
        </div>
      </section>
    </template>

    <BaseShare class="profile-page__share" />

    <BaseModal v-if="!isModalHidden" @close="hideModal" />
  </main>
</template>

<style lang="scss">
.profile-page {
  position: relative;
  padding: 64px 0 8px;
  display: flex;
  flex-direction: column;

  &__section {
    margin-top: 8px;
  }

  &__share {
    position: absolute;
    top: 8px;
    left: 0;
  }

  .profile-header {
    padding: 12px;
    border-radius: 24px;
    background-color: $black-100;

    &__wrapper {
      display: flex;
    }

    &__text {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      width: calc(100% - 72px - 8px - 32px - 8px);
    }

    &__name {
      @include overflow-ellipsis;
      @include body-16;

      color: $gray-100;
    }

    &__nickname {
      @include overflow-ellipsis;
      @include body-14;

      color: $gray-750;
    }

    &__balance {
      margin-top: 8px;
      display: flex;
      gap: 12px;
    }

    &__emblem {
      margin-left: auto;
      width: 32px;
      height: 32px;
    }

    &__link {
      margin-top: 12px;
    }
  }

  .profile-section {
    &__header {
      padding: 15px 0;
      display: flex;
      align-items: center;
    }

    &__title {
      @include body-16;
      flex-grow: 1;
      margin-right: 8px;
      color: $gray-100;
    }

    &__list {
      &_awards {
        display: grid;
        grid-template-columns: repeat(3, 109px);
        column-gap: 8px;
      }
    }
  }
}
</style>
