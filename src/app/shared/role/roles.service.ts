import { Injectable } from '@angular/core';

import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Role[] = [
    {
      name: 'Citizen',
      alignment: 'Town',
      description: 'A regular citizen with no special abilities.',
      abilities: 'None',
      healProfile: 'None'
    },
  ]

  getRoleInfo() {
    return this.roles.map(role => {
      return {
        name: role.name,
        alignment: role.alignment,
        description: role.description,
        abilities: role.abilities,
      }
    })
  }
}
