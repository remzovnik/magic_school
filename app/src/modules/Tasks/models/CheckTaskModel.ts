import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";
import { UserTaskStatusType } from "@/modules/Tasks/models/TaskModel";

export class CheckTaskResponseModel extends BaseResponseModel {
  result: CheckTaskModel | null;
}

export class CheckTaskModel {
  userId: number;
  taskId: number;
  date: number;
  status: UserTaskStatusType;
  remainingSeconds: number | null;

  constructor(init?: Partial<CheckTaskModel>) {
    Object.assign(this, init);
  }
}
