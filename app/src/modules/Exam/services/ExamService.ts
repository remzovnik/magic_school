import { BaseService } from "@/modules/Base/services/BaseService";
import { TaskResponseModel } from "@/modules/Tasks/models/TaskModel";
import { ExamStartResponseModel } from "@/modules/Exam/models/ExamStartModel";
import { ExamCheckResponseModel } from "@/modules/Exam/models/ExamCheckModel";

export class ExamService extends BaseService {
  async ticketSelect(): Promise<TaskResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/exam/ticket-selection`,
    });
  }

  async start(taskAlias: string): Promise<ExamStartResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/exam/${taskAlias}/start`,
    });
  }

  async check(taskAlias: string): Promise<ExamCheckResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: `/exam/${taskAlias}/check`,
    });
  }
}
