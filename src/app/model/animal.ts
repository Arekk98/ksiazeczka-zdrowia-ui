import {AnimalDetails} from "./animal-details";
import {Visit} from "./visit";
import {UserDetails} from "./user-details";
import {Comment} from "./comment";

export interface Animal {
  animal: AnimalDetails
  visits: Visit[]
  comments: Comment[]
  owner: UserDetails
}
