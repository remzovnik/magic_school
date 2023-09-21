import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

export class GradeResponseModel extends BaseResponseModel {
  result: GradeModel | null;
}

export class GradeModel {
  grade: EGradeType;

  constructor(init?: Partial<GradeModel>) {
    Object.assign(this, init);
  }
}

export enum EGradeType {
  EXCELLENT = 5,
  GOOD = 4,
  MEDIOCRE = 3,
}
