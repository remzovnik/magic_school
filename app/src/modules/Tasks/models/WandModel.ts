import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

export class WandResponseModel extends BaseResponseModel {
  result: WandModel;
}

export interface WandModel {
  remainingSeconds: number | null;
}
