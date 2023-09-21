import { UserModel } from "@/modules/Profile/models/UserModel";

export interface UserStoreModel {
  user: UserModel | null;
}
