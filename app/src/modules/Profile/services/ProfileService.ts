import { BaseService } from "@/modules/Base/services/BaseService";

export class ProfileService extends BaseService {
    async countLinkCopy(): Promise<void> {
        return await this.apiRequest({
            method: "post",
            url: "/link/copy",
        });
    }
}
