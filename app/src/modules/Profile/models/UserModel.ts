import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { FacultyType } from "@/modules/Base/models/FacultyType";

export class UserResponseModel extends BaseResponseModel {
  result: UserModel | null;
}

export class UserModel {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  points: number;
  photo: string;
  facultyID: FacultyType;
  deluminatorCount: number;
  magicWandCount: number;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
