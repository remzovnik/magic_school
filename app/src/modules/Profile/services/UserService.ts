import { BaseService } from "@/modules/Base/services/BaseService";
import { UserResponseModel } from "@/modules/Profile/models/UserModel";

export class UserService extends BaseService {
  async getUser(): Promise<UserResponseModel> {
    let response = await this.apiRequest({
      method: "get",
      url: "/user",
    });

    return response;
  }

  async createUser(): Promise<UserResponseModel> {
    return await this.apiRequest({
      method: "post",
      url: "/user/create",
    });
  }
}
