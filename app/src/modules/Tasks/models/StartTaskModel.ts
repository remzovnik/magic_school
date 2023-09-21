import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

export class StartTaskResponseModel extends BaseResponseModel {
  result: StartTaskModel | null;
}

export class StartTaskModel {
  user_id: number;
  task_id: number;
  create_date: string;
  status: string;
  remainingSeconds: number | null;

  constructor(init?: Partial<StartTaskModel>) {
    Object.assign(this, init);
  }
}
