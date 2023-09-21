import { defineStore } from 'pinia'
import { FacultyStoreModel } from "@/modules/Faculty/models/FacultyStoreModel";

export const useFacultyStore = defineStore("faculty", {
    state: (): FacultyStoreModel => ({
        list: null
    }),
})
