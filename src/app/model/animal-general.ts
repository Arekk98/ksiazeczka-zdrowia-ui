import {UserShortData} from "./user-short-data";

export interface AnimalGeneral {
  id: string
  name: string
  species: string
  owner: UserShortData
}
