import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

type TaskStatusType = "active" | "block" | "deleted" | "active_not_check" | "active_processing" | "active_check" | "active_info";
export type UserTaskStatusType = "null" | "processing" | "done" | "fail" | "time over" | "lose";

export class TasksResponseModel extends BaseResponseModel {
  result: {
    isExamEnabled: boolean;
    countCompleted: number;
    examTask: TaskModel;
    tasks: TaskModel[];
  } | null;
}

export class TaskResponseModel extends BaseResponseModel {
  result: TaskModel | null;
}

export class TaskModel {
  id: number;
  title: string;
  description: string;
  alias: string;
  points: number;
  taskStatus: TaskStatusType;
  userTaskStatus: UserTaskStatusType;
  remainingSeconds: number | null;
  useExtraTime: boolean;
  useDeluminator: boolean;

  constructor(init?: Partial<TaskModel>) {
    Object.assign(this, init);
  }
}
