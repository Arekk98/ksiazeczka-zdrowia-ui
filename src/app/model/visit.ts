import {UserShortData} from "./user-short-data";

export interface Visit {
  id?: string
  date?: string
  vet?: UserShortData
  servicesNames?: string[]
  servicesIds?: string[]
}
