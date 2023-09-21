import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/modules/Home/pages/HomePage.vue"),
    },
    {
      path: "/hat",
      name: "hat",
      component: () => import("@/modules/Hat/pages/HatPage.vue"),
    },
    {
      path: "/faculty",
      name: "faculty",
      component: () => import("@/modules/Faculty/pages/FacultyPage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/modules/Profile/pages/ProfilePage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/modules/Profile/pages/ProfilePage.vue"),
    },
    {
      path: "/awards",
      name: "awards",
      component: () => import("@/modules/Awards/pages/AwardPage.vue"),
    },
    {
      path: "/rating",
      name: "rating",
      component: () => import("@/modules/Rating/pages/RatingPage.vue"),
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("@/modules/Tasks/pages/TasksPage.vue"),
    },
    {
      path: "/exam-pick",
      name: "examPick",
      component: () => import("@/modules/Exam/pages/ExamPickPage.vue"),
    },
    {
      path: "/exam",
      name: "exam",
      component: () => import("@/modules/Exam/pages/ExamPage.vue"),
    },
    {
      path: "/diplom",
      name: "diplom",
      component: () => import("@/modules/Diplom/pages/Diplom.vue"),
    },
  ],
});

export default router;
