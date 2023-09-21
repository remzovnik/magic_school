import { createApp } from "vue";
import { createPinia } from "pinia";
import createAxios from "./createAxios";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/styles/index.scss";
import "virtual:svg-icons-register";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import mitt from "mitt";
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

const emitter = mitt();

const app = createApp(App);
const $axios = createAxios(app);

app.provide("emitter", emitter);

app.use(FloatingVue);
//@ts-ignore
app.use(Vue3Lottie);
app.use(createPinia());
app.use(router);
app.mount("#app");

export { $axios };
