import { $axios } from "@/main";
import { stringify } from "query-string";

type RequestMethodType = "get" | "post" | "patch" | "delete" | "put";

interface apiRequestConfigModel {
  method: RequestMethodType;
  url: string;
  body?: object;
  params?: object;
}

export class BaseService {
  async healthLive() {
    $axios.get("/api/health/live");
  }

  async linkCopy() {
    $axios.post("/link/copy");
  }

  async apiRequest(config: apiRequestConfigModel) {
    const url = config.params ? `${config.url}?${stringify(config.params)}` : config.url;

    try {
      const response = await $axios[config.method](url, config.body);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  }
}
