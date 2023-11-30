import { Role } from "./roles/role.model";
import CitizenLocale from "../resources/locale/en-US/roles/town/citizen.json"
import Citizen from "../resources/data/roles/town/citizen.json"

export class Player {
  private role: Role;

  constructor(citizen: typeof Citizen) {
    this.role = Citizen
  }
}
