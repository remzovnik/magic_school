import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { StartTaskModel } from "@/modules/Tasks/models/StartTaskModel";

export class ExamStartResponseModel extends BaseResponseModel {
  result: StartTaskModel | null;
}
