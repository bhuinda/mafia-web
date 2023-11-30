import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Role } from "./role.model";
import { RoleProfile } from "./role-profile.model";
import { RoleOptions } from "./role-options.model";
import { Observable } from "rxjs";

@Injectable()
export class RoleController {

  constructor(private http: HttpClient) {}

  createRole(id: string, locale: string): Observable<Role> {
    return this.http.get(`./path-to-data/${id}/${locale}.json`)
      .pipe(
        map(data => {
          const roleProfile: RoleProfile = {
            name: data.name,
            description: data.description,
            alignment: data.alignment,
            faction: data.faction,
            ability: data.ability,
            traits: data.traits
          };

          const roleOptions: RoleOptions = {
            traits: data.traits
          };

          return new CitizenRole(roleProfile, roleOptions);
        })
    );
  }
}
