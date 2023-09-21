<script setup lang="ts">
import Service from "@/service";
import { useUserStore } from "@/modules/Profile/stores/UserStore";
import { useFacultyStore } from "@/modules/Faculty/stores/FacultyStore";
import RouteModel from "@/modules/Base/models/RouteModel";
import router from "@/router";

const $userStore = useUserStore();
const $facultyStore = useFacultyStore();

const fetch = async () => {
  const facultyResponse = await Service.faculty.getList();

  if (facultyResponse.result) {
    $facultyStore.list = [...facultyResponse.result];
  }

  const userResponse = await Service.user.getUser();
  if (!userResponse.error) {
    if (userResponse.result) {
      $userStore.user = { ...userResponse.result };
    }

    const profileRoute: RouteModel = { name: "profile" };
    router.push(profileRoute);
  } else {
    const hatRoute: RouteModel = { name: "hat" };
    router.push(hatRoute);
  }
};

fetch();
</script>

<template>
  <div></div>
</template>
