import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Role } from "./role.model";
import { RoleProfile } from "./role-profile.model";
import { RoleOptions } from "./role-options.model";
import { Metadata } from "../../metadata.service";

@Injectable()
export class RoleController implements OnInit {

  constructor(
    private http: HttpClient,
    private metadata: Metadata
    ) {}

  ngOnInit(): void {
    console.log(this.metadata.catalog);
  }

  // createRole(id: string, locale: string): Observable<Role> {
  //   return this.http.get(`./data/${id}/${locale}.json`)
  //     .pipe(
  //       map((data: any) => {
  //         const roleProfile: RoleProfile = {
  //           name: data.name,
  //           description: data.description,
  //           alignment: data.alignment,
  //           faction: data.faction,
  //           ability: data.ability,
  //           traits: data.traits
  //         };

  //         const roleOptions: RoleOptions = {
  //           traits: data.traits
  //         };

  //         const role = this.metadata.catalog['TownRoles'];
  //         if (!role) {
  //           throw new Error(`Invalid role ID: ${id}`);
  //         }

  //         return {
  //           roleProfile,
  //           roleOptions
  //         }
  //       })
  //   );
  // }
}
