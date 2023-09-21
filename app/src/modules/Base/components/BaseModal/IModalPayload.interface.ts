import { EModalTypes } from "@/modules/Base/components/BaseModal/EModalTypes.enum";

export interface IModalPayload {
  type: EModalTypes;
  props: object;
}
