<script setup lang="ts">
import BaseAvatar from "@/modules/Base/components/BaseAvatar.vue";
import BaseScore from "@/modules/Base/components/BaseScore.vue";
import { UserModel } from "@/modules/Profile/models/UserModel";

const props = withDefaults(
  defineProps<{
    model: UserModel;
  }>(),
  { model: () => new UserModel() }
);
</script>

<template>
  <div class="profile-card">
    <span class="profile-card__leftside">
      <BaseAvatar :image="model.photo" :size="48" />

      <span class="profile-card__text">
        <h2 class="profile-card__name">{{ model.name }} {{ model.surname }}</h2>

        <div class="profile-card__nickname">@{{ model.nickname }}</div>
      </span>
    </span>

    <BaseScore class="profile-card__score" :count="model.points" />
  </div>
</template>

<style lang="scss">
.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid $gray-850;

  &__leftside {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  &__text {
    margin-left: 8px;
    width: 180px;
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

  &__score {
    flex-shrink: 0;
  }
}
</style>
