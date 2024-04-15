import { Address } from "./address";

export type Shop = {
  id?: number;
  name: string;
  phoneNumber: string;
  isActive: boolean;
  addresses: Address[];
};
