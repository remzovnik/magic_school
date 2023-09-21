<script setup lang="ts">
import { inject } from "vue";
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import Service from "@/service";
import light from "@/modules/Base/components/BaseModal/light.json";
import { useUserStore } from "@/modules/Profile/stores/UserStore";

const $userStore = useUserStore();

const props = defineProps<{
  taskAlias: string;
}>();

const emitter: any = inject("emitter");

const emit = defineEmits<{
  (e: "close"): void;
}>();

const deliminateTask = async () => {
  const response = await Service.tasks.deluminatorTask(props.taskAlias);

  if (response.result) {
    emitter.emit("useDeluminator", { taskAlias: props.taskAlias });

    if ($userStore.user?.deluminatorCount) {
      $userStore.user.deluminatorCount--;
    }
  }

  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div class="modal-deluminator">
    <div class="modal-deluminator__image-wrapper">
      <Vue3Lottie class="modal-deluminator__animation" :animationData="light" :height="100" :width="100" />
      <img class="modal-deluminator__image" src="/images/deluminator.svg" />
    </div>

    <div class="modal-deluminator__description">Использовать делюминатор и автоматически выполнить задание?</div>

    <BaseButton class="modal-deluminator__submit" @click="deliminateTask">Применить</BaseButton>

    <BaseButton class="base-modal__close" icon="close" type="transparent" @click="closeModal" />
  </div>
</template>

<style lang="scss">
.modal-deluminator {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__animation {
    position: absolute;
    top: -60%;
    left: -42%;
  }

  &__image-wrapper {
    position: relative;
    width: 64px;
  }

  &__image {
    position: relative;
    z-index: 1;
    width: 64px;
  }

  &__description {
    @include headline-18;
    margin-top: 12px;
  }

  &__submit {
    margin-top: 18px;
  }
}
</style>
