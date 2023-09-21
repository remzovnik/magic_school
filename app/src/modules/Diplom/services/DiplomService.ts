import { BaseService } from "@/modules/Base/services/BaseService";
import { GradeResponseModel } from "@/modules/Diplom/models/GradeModel";

export class DiplomService extends BaseService {
  async getGrade(): Promise<GradeResponseModel> {
    return await this.apiRequest({
      method: "get",
      url: `/diploma`,
    });
  }
}
