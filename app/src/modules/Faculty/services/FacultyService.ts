import { BaseService } from "@/modules/Base/services/BaseService";
import { FacultyTopUsersResponseModel } from "@/modules/Faculty/models/FacultyTopUsersModel";
import { FacultyType } from "@/modules/Base/models/FacultyType";
import { FacultyListResponseModel } from "@/modules/Faculty/models/FacultyModel";

export class FacultyService extends BaseService {
  async getTopUsers(facultyId: FacultyType, count: number): Promise<FacultyTopUsersResponseModel> {
    return await this.apiRequest({
      method: "get",
      url: `/faculty/${facultyId}/top-users`,
      params: {
        count: count,
      },
    });
  }

  async getList(): Promise<FacultyListResponseModel> {
    return await this.apiRequest({
      method: "get",
      url: `/faculty/list`,
    });
  }
}
