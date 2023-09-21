import { BaseService } from "@/modules/Base/services/BaseService";
import { TasksResponseModel } from "@/modules/Tasks/models/TaskModel";
import { StartTaskResponseModel } from "@/modules/Tasks/models/StartTaskModel";
import { CheckTaskResponseModel } from "@/modules/Tasks/models/CheckTaskModel";
import { DeluminatorResponseModel } from "@/modules/Tasks/models/DeluminatorModel";
import { WandResponseModel } from "@/modules/Tasks/models/WandModel";

export class TasksService extends BaseService {
  async getTasks(): Promise<TasksResponseModel> {
    return await this.apiRequest({
      method: "get",
      url: `/task/list`,
    });
  }

  async startTask(taskAlias: string): Promise<StartTaskResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/task/${taskAlias}/start`,
    });
  }

  async checkTask(taskAlias: string): Promise<CheckTaskResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/task/${taskAlias}/check`,
    });
  }

  async deluminatorTask(taskAlias: string): Promise<DeluminatorResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/task/${taskAlias}/deluminator`,
    });
  }

  async wandTask(taskAlias: string): Promise<WandResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/task/${taskAlias}/adding-time`,
    });
  }
}
