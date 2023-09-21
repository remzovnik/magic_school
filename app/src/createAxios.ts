import axios from "axios";
import type { App } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";

const newToken = new URL(window.location.href).searchParams.get("token");
const cookies = useCookies(["cookies"]);

if (newToken) {
  cookies.set("token", newToken, { path: "/", maxAge: 1000000 });
}

const currentToken = newToken || cookies.get("token");

const createAxios = (app: App) => {
  const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_YARUS_URL,
  });

  apiInstance.interceptors.request.use(async (config) => {
    await apiKeyHeaderInterceptor(config);
    return config;
  });

  return apiInstance;
};

const apiKeyHeaderInterceptor = async (config) => {
  if (!config.headers) {
    config.headers = {};
  }

  config.headers["X-API-KEY"] = config.headers["X-API-KEY"] || import.meta.env.VITE_APP_API_KEY;
  config.headers["authorization"] = `Bearer ${currentToken}`;

  return config;
};

export default createAxios;
