import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info.component';
import { InfoRolesComponent } from './info-roles/info-roles.component';
import { InfoGameplayComponent } from './info-gameplay/info-gameplay.component';
import { InfoMechanicsComponent } from './info-mechanics/info-mechanics.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent,
    children: [
      { path: 'gameplay', component: InfoGameplayComponent },
      { path: 'mechanics', component: InfoMechanicsComponent },
      { path: 'roles', component: InfoRolesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
