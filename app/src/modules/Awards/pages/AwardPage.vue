<script setup lang="ts">
import { ref } from "vue";
import Service from "@/service";
import AwardCard from "@/modules/Awards/components/AwardCard.vue";
import ProfileBack from "@/modules/Profile/components/ProfileBack.vue";
import { AwardModel } from "@/modules/Awards/models/AwardModel";

const awardsList = ref<AwardModel[]>([]);
const isLoading = ref(true);

const fetch = async (): Promise<void> => {
  isLoading.value = true;

  const awardsResponse = await Service.awards.getAwards();
  if (awardsResponse.result) {
    awardsList.value = [...awardsResponse.result];
  }

  isLoading.value = false;
};

fetch();
</script>

<template>
  <main class="award-page">
    <h1 class="award__title">Награды</h1>

    <div class="award-page__grid">
      <div class="award-page__cell" v-for="(item, index) in awardsList" :key="`award-${index}`">
        <AwardCard :model="item" />
      </div>
    </div>

    <ProfileBack />
  </main>
</template>

<style lang="scss">
.award-page {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 17px 0 64px;
  text-align: center;

  &__title {
    @include label-16;
  }

  &__grid {
    margin-top: 24px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: repeat(3, 109px);
    gap: 8px;
  }
}
</style>
