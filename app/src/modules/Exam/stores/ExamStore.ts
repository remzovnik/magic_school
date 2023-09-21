import { defineStore } from "pinia";
import { ExamStoreModel } from "@/modules/Exam/models/ExamStoreModel";

export const useExamStore = defineStore("exam", {
  state: (): ExamStoreModel => ({
    examTask: null,
  }),
});
