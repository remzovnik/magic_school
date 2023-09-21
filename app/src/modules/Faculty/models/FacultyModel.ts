import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { FacultyType } from "@/modules/Base/models/FacultyType";

export class FacultyListResponseModel extends BaseResponseModel {
  result: FacultyModel[] | null;
}

export class FacultyModel {
  id: FacultyType;
  title: string;
  emblem: string;
  heading: string;
  description: string;

  constructor(init?: Partial<FacultyModel>) {
    Object.assign(this, init);
  }
}
