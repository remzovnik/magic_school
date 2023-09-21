<script setup lang="ts">
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import { inject } from "vue";
import Service from "@/service";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import stars from "@/modules/Base/components/BaseModal/stars.json";

const $userStore = useUserStore();

const props = defineProps<{
  taskAlias: string;
}>();

const emitter: any = inject("emitter");

const emit = defineEmits<{
  (e: "close"): void;
}>();

const wandTask = async () => {
  const response = await Service.tasks.wandTask(props.taskAlias);

  if (!response.error) {
    emitter.emit("useWand", { taskAlias: props.taskAlias, currentTime: response.result.remainingSeconds });

    if ($userStore.user?.magicWandCount) {
      $userStore.user.magicWandCount--;
    }
  }

  emit("close");
};

const closeModal = () => {
  emitter.emit("closeWand", { taskAlias: props.taskAlias });

  emit("close");
};
</script>

<template>
  <div class="modal-wand">
    <div class="modal-wand__image-wrapper">
      <Vue3Lottie class="modal-wand__animation" :animationData="stars" :height="100" :width="100" />
      <img class="modal-wand__image" src="/images/wand.svg" />
    </div>
    <div class="modal-wand__title">Использовать волшебную палочку и получить 48 часов дополнительного времени?</div>
    <div v-if="$userStore.user?.magicWandCount" class="modal-wand__description">
      Осталось {{ $userStore.user.magicWandCount }}
    </div>

    <BaseButton class="modal-wand__submit" @click="wandTask">Применить</BaseButton>
    <BaseButton class="base-modal__close" icon="close" type="transparent" @click="closeModal" />
  </div>
</template>

<style lang="scss">
.modal-wand {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__animation {
    position: absolute;
    top: -60%;
    left: -30%;
  }

  &__image-wrapper {
    position: relative;
    width: 64px;
  }

  &__title {
    @include headline-18;
    margin-top: 12px;
  }

  &__description {
    @include body-14;
    margin-top: 24px;
  }

  &__submit {
    margin-top: 18px;
  }
}
</style>
