<script setup lang="ts">
import { shallowRef, ref, inject } from "vue";
import ModalDeluminator from "@/modules/Base/components/BaseModal/ModalDeluminator.vue";
import ModalWand from "@/modules/Base/components/BaseModal/ModalWand.vue";
import ModalCongratulations from "@/modules/Base/components/BaseModal/ModalCongratulations.vue";
import { EModalTypes } from "@/modules/Base/components/BaseModal/EModalTypes.enum";

const emitter: any = inject("emitter");

const currentModal = shallowRef();
const isOpened = ref<boolean>(false);
const modalProps = ref();

const modalSet = {
  [EModalTypes.DELUMINATOR]: ModalDeluminator,
  [EModalTypes.WAND]: ModalWand,
  [EModalTypes.CONGRATULATIONS]: ModalCongratulations,
};

const closeModal = (): void => {
  isOpened.value = false;
  document.documentElement.style.overflowY = "initial";
};

emitter.on("openModal", async (payload) => {
  isOpened.value = true;
  currentModal.value = modalSet[payload.type];
  modalProps.value = payload.props;
  document.documentElement.style.overflowY = "hidden";
});
</script>

<template>
  <div v-if="isOpened" class="base-modal">
    <div class="base-modal__wrapper">
      <component :is="currentModal" v-if="currentModal" @close="closeModal" v-bind="modalProps" />
    </div>
  </div>
</template>

<style lang="scss">
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: $overlay-100-40;
    background-blend-mode: multiply;
    backdrop-filter: blur(4px);
  }

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 343px;
    width: calc(100% - 16px * 2);
    padding: 24px;
    border-radius: $border-radius-md;
    text-align: center;
    background-color: $gray-850;
  }

  &__title {
    @include headline-18;
    color: $gray-100;
  }

  &__desc {
    @include body-16;
    margin-top: 12px;
    color: $gray-100;
  }

  &__button {
    margin-top: 24px;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $gray-100;
  }
}
</style>
