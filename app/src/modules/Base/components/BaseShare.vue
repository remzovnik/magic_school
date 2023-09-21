<script setup lang="ts">
import { ref } from "vue";
import Service from "@/service";
import BaseButton from "@/modules/Base/components/BaseButton.vue";

const isCopied = ref(false);
const isNotifyShown = ref(false);

const shareLink = () => {
  const textArea = document.createElement("textarea");
  textArea.value = "https://yarus.ru/miniapps/magic";

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "0";
  textArea.style.height = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");
  document.body.removeChild(textArea);

  isCopied.value = true;
  isNotifyShown.value = true;
  Service.base.linkCopy();

  setTimeout(() => {
    isCopied.value = false;
    isNotifyShown.value = false;
  }, 2000);
};
</script>

<template>
  <div class="base-share">
    <BaseButton size="large" type="circle" icon="copy" @click="shareLink" />

    <Transition>
      <div v-if="isCopied" class="base-share__notification">Ссылка скопирована в буфер обмена</div>
    </Transition>
  </div>
</template>

<style lang="scss">
.base-share {
  &__notification {
    @include body-16;
    position: fixed;
    top: 64px;
    left: calc((100vw - 375px) / 2 + 8px);
    margin: 0 auto;
    width: 360px;
    background-color: $gray-850;
    padding: 16px;
    border-radius: $border-radius-md;
    text-align: center;
    color: $white-100;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
