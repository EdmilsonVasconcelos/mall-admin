import { Address } from "./address";

export type Shop = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  addresses: Address[];
};
