import { defineStore } from "pinia";
import { UserStoreModel } from "@/modules/Profile/models/UserStoreModel";

export const useUserStore = defineStore("user", {
  state: (): UserStoreModel => ({
    user: null,
  }),
});
