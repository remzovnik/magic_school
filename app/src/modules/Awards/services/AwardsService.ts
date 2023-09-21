import { BaseService } from "@/modules/Base/services/BaseService";
import { AwardsResponseModel } from "@/modules/Awards/models/AwardModel";

export class AwardsService extends BaseService {
  async getAwards(): Promise<AwardsResponseModel> {
    return await this.apiRequest({
      method: "get",
      url: `/award`,
    });
  }
}
