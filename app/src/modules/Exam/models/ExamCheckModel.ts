import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { UserTaskStatusType } from "@/modules/Tasks/models/TaskModel";

export class ExamCheckResponseModel extends BaseResponseModel {
  result: ExamCheckModel | null;
}

export class ExamCheckModel {
  userId: number;
  taskId: number;
  date: number;
  status: UserTaskStatusType;

  constructor(init?: Partial<ExamCheckModel>) {
    Object.assign(this, init);
  }
}
