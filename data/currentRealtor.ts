import { realtors, Realtor } from "./realtor";

export function getRealtor(id: Realtor) {
  return realtors[id];
}