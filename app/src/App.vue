<script setup lang="ts">
import Service from "@/service";
import { onMounted } from "vue";
import router from "@/router";
import BaseModal from "@/modules/Base/components/BaseModal/BaseModal.vue";

onMounted(() => {
  Service.base.healthLive();
  router.push({ name: "home" });
});
</script>

<template>
  <div class="app">
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <BaseModal class="app__modal" />
  </div>
</template>

<style lang="scss">
.app {
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
