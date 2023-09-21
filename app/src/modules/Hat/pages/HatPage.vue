<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { gsap } from "gsap";
import Service from "@/service";
import BaseButton from "@/modules/Base/components/BaseButton.vue";
import RouteModel from "@/modules/Base/models/RouteModel";
import BaseFaculty from "@/modules/Faculty/components/FacultyCard.vue";
import { useFacultyStore } from "@/modules/Faculty/stores/FacultyStore";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { FacultyModel } from "@/modules/Faculty/models/FacultyModel";

const $userStore = useUserStore();
const $facultyStore = useFacultyStore();

const isStarted = ref(false);
const isCompleted = ref(false);
const isLoading = ref(true);

let hatLevitation;
let hatCasting;
let starsCasting;

const carouselFinalPositions = ["-3020px 0", "-3110px 0", "-2935px 0", "-2845px 0"];

const currentFacultyPosition = ref<string>(carouselFinalPositions[0]);

const routeName = computed<RouteModel | undefined>(() => {
  return { name: "faculty" };
});

const currentFaculty = computed<FacultyModel>(() => {
  return $facultyStore.list?.find((item) => item.id === $userStore.user?.facultyID) || new FacultyModel();
});

const clickHat = async (): Promise<void> => {
  isStarted.value = true;

  const response = await Service.user.createUser();

  if (response.result) {
    $userStore.user = { ...response.result };
    currentFacultyPosition.value = carouselFinalPositions[response.result.facultyID - 1];
  }

  hatLevitation.kill();
  hatCasting.play();
  starsCasting.play();

  //carousel sliding
  gsap.to(".hat-page__carousel", {
    backgroundPosition: currentFacultyPosition.value,
    ease: "power2.easeOut",
    duration: 5,
    onComplete: () => {
      setTimeout(() => {
        isCompleted.value = true;
      }, 500);
    },
  });
};

onMounted(() => {
  hatLevitation = gsap.to(".hat-page__hat", {
    duration: 2,
    y: -30,
    ease: "sine.out",
    repeat: -1,
    yoyo: true,
  });

  //hat casting
  hatCasting = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    repeatRefresh: true,
  });

  hatCasting.to(".hat-page__hat", {
    duration: 0.3,
    rotation: 15,
    ease: "power2.easeOut",
  });

  hatCasting.to(".hat-page__hat", {
    duration: 0.3,
    rotation: -15,
    ease: "power2.easeOut",
  });

  //stars casting
  starsCasting = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
  });

  //star 1
  starsCasting.from(".hat-page__star_1", {
    opacity: 0,
    x: 30,
    y: 30,
  });

  starsCasting.to(".hat-page__star_1", {
    ease: "power2.easeOut",
    x: 0,
    y: 0,
    opacity: 1,
    duration: 0.3,
  });

  starsCasting.to(".hat-page__star_1", { opacity: 0, duration: 0.3 });

  //star 4
  starsCasting.from(
    ".hat-page__star_4",
    {
      opacity: 0,
      x: -30,
      y: 30,
    },
    "-=0.3"
  );

  starsCasting.to(
    ".hat-page__star_4",
    {
      ease: "power2.easeOut",
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    },
    "-=0.3"
  );

  starsCasting.to(".hat-page__star_4", { opacity: 0, duration: 0.5 }, "-=0.3");

  //star 2
  starsCasting.from(
    ".hat-page__star_2",
    {
      opacity: 0,
      x: 30,
      y: 30,
    },
    "-=0.3"
  );

  starsCasting.to(
    ".hat-page__star_2",
    {
      ease: "power2.easeOut",
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    },
    "-=0.3"
  );

  starsCasting.to(".hat-page__star_2", { opacity: 0, duration: 0.5 }, "-=0.3");

  //star 3
  starsCasting.from(
    ".hat-page__star_3",
    {
      opacity: 0,
      x: 30,
      y: 30,
    },
    "-=0.3"
  );

  starsCasting.to(
    ".hat-page__star_3",
    {
      ease: "power2.easeOut",
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    },
    "-=0.3"
  );

  starsCasting.to(".hat-page__star_3", { opacity: 0, duration: 0.5 }, "-=0.3");

  //star 5
  starsCasting.from(
    ".hat-page__star_5",
    {
      opacity: 0,
      x: -30,
      y: 30,
    },
    "-=0.3"
  );

  starsCasting.to(
    ".hat-page__star_5",
    {
      ease: "power2.easeOut",
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    },
    "-=0.3"
  );

  starsCasting.to(".hat-page__star_5", { opacity: 0, duration: 0.5 });

  hatLevitation.play();
  hatCasting.pause();
  starsCasting.pause();
});
</script>

<template>
  <main class="hat-page">
    <div v-if="!isCompleted" class="hat-page__intro">
      <h1 class="hat-page__title">Школа волшебников. Добро пожаловать!</h1>

      <button class="hat-page__hat-button" type="button" @click="clickHat">
        <img class="hat-page__hat" src="/images/hat.svg" />

        <img class="hat-page__star_1" src="/images/star.svg" />
        <img class="hat-page__star_2" src="/images/star.svg" />
        <img class="hat-page__star_3" src="/images/star.svg" />
        <img class="hat-page__star_4" src="/images/star.svg" />
        <img class="hat-page__star_5" src="/images/star.svg" />
      </button>

      <div v-show="!isStarted" class="hat-page__description">Нажми на шляпу, чтобы поступить на факультет</div>
      <div v-show="isStarted" ref="carouselEl" class="hat-page__carousel">
        <img class="hat-page__carousel-pointer" src="/images/pointer.svg" />
      </div>
    </div>

    <Transition>
      <div v-if="isCompleted" class="hat-page__final">
        <h1 class="hat-page__title">
          Поздравляем!<br />
          Вы приняты в {{ currentFaculty.title }}
        </h1>

        <BaseFaculty class="hat-page__faculty" :model="currentFaculty" />

        <BaseButton is-full-width :route="routeName" class="hat-page__link">Далее</BaseButton>
      </div>
    </Transition>
  </main>
</template>

<style lang="scss">
.hat-page {
  text-align: center;
  padding: 124px 0 8px;
  height: 100vh;

  &__title {
    @include headline-24;
    margin-bottom: 32px;
    color: $gray-100;
  }

  &__hat-button {
    position: relative;
    margin-bottom: 24px;
    display: block;
    width: 100%;
  }

  &__hat {
    width: 230px;
    height: 354px;
  }

  &__star {
    position: absolute;
    top: 48px;
    left: 60px;
  }

  &__star {
    &_1 {
      position: absolute;
      top: 38px;
      left: 60px;
    }

    &_2 {
      position: absolute;
      top: 90px;
      left: 30px;
    }

    &_3 {
      position: absolute;
      top: 35px;
      left: 95px;
    }

    &_4 {
      position: absolute;
      top: 60px;
      left: 250px;
    }

    &_5 {
      position: absolute;
      top: 115px;
      left: 260px;
    }
  }

  &__carousel {
    position: relative;
    margin: 0 -16px;
    width: 375px;
    height: 80px;
    background: url("/images/carousel-bg.png") repeat-x 0% 50% / auto 80px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      height: 80px;
      background: linear-gradient(270deg, rgba(47, 47, 47, 0) 0%, #282828 100%, #2f2f2f 100%);
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 32px;
      height: 80px;
      background: linear-gradient(270deg, rgba(47, 47, 47, 0) 0%, #282828 100%, #2f2f2f 100%);
    }
  }

  &__carousel-pointer {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__description {
    @include body-16;
    margin-bottom: 16px;
    color: $gray-100;
  }

  &__final {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__faculty {
    margin-top: 58px;
    width: 256px;
    height: 256px;
  }

  &__link {
    margin-top: auto;
  }
}
</style>
