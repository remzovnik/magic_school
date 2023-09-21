<script setup lang="ts">
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import firework from "@/modules/Base/components/BaseModal/firework.json";
import RouteModel from "@/modules/Base/models/RouteModel";
import router from "@/router";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const tasksRoute: RouteModel = { name: "tasks" };

const returnToTasks = (): void => {
  emit("close");
  router.push(tasksRoute);
};

const closeModal = (): void => {
  emit("close");
};
</script>

<template>
  <div class="modal-congratulations">
    <Vue3Lottie :animationData="firework" :height="200" :width="200" />
    <h2 class="modal-congratulations__title">Выпусканцио!</h2>
    <div class="modal-congratulations__description">
    Вы сдали экзамен, поздравляем, волшебник! Сейчас экзаменационная работа находится на проверке. Ожидайте объявления результатов в ближайшее время✨
    </div>
    <BaseButton class="modal-congratulations__submit" @click="returnToTasks">Жду результатов</BaseButton>

    <BaseButton class="base-modal__close" icon="close" type="transparent" @click="closeModal" />
  </div>
</template>

<style lang="scss">
.modal-congratulations {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {
    width: 64px;
  }

  &__title {
    @include headline-18;
    margin-top: -60px;
  }

  &__description {
    @include body-16;
    margin-top: 8px;
  }

  &__submit {
    margin-top: 24px;
  }
}
</style>
