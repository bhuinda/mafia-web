import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/shared/role/roles.service';
import { Role } from 'src/app/shared/role/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './info-roles.component.html',
  styleUrls: ['./info-roles.component.css']
})

export class InfoRolesComponent implements OnInit{
  rolesOfTown?: Role[];
  rolesOfMafia?: Role[];
  rolesOfTriad?: Role[];
  rolesOfNeutral?: Role[];

  constructor(private rolesService: RoleService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
  }
}
