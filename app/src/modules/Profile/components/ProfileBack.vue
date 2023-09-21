<script lang="ts" setup>
import { Router, useRouter } from "vue-router";
import BaseButton from "@/modules/Base/components/BaseButton.vue";

const router: Router = useRouter();

const routeBack = (): void => {
  router.go(-1);
};
</script>

<template>
  <div class="profile-back">
    <BaseButton class="profile-back__btn" size="large" type="circle" icon="arrow-left" is-full-width @click="routeBack">
    </BaseButton>
  </div>
</template>

<style lang="scss">
.profile-back {
  position: absolute;
  top: 12px;
  left: 0;
}
</style>
