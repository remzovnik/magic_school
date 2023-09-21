import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

export class DeluminatorResponseModel extends BaseResponseModel {
  result: DeluminatorModel | null;
}

export class DeluminatorModel {
  user_id: number;
  task_id: number;
  date: number;
  status: string;

  constructor(init?: Partial<DeluminatorModel>) {
    Object.assign(this, init);
  }
}
