import { BaseResponseModel } from "@/modules/Base/models/BaseResponseModel";

export type AwardStatusType = 'received' | 'notReceived'

export class AwardsResponseModel extends BaseResponseModel {
    result: AwardModel[] | null;
}

export class AwardModel {
    id: number;
    title: string;
    image: string;
    status: AwardStatusType;
    dateReceived: string;
    description: string

    constructor(init?: Partial<AwardModel>) {
        Object.assign(this, init);
    }
}
