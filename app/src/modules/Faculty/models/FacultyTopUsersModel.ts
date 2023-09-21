import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { UserModel } from "@/modules/Profile/models/UserModel";

export class FacultyTopUsersResponseModel extends BaseResponseModel {
    result: FacultyTopUsersModel | null;
}

class FacultyTopUsersModel {
    countPoints: number
    users: TopUserModel[]
}

export class TopUserModel {
    position: number;
    user: UserModel
}




