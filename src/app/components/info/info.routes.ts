import { Route } from '@angular/router';
import { InfoComponent } from './info.component';
import { InfoRolesComponent } from './info-roles/info-roles.component';
import { InfoGameplayComponent } from './info-gameplay/info-gameplay.component';
import { InfoMechanicsComponent } from './info-mechanics/info-mechanics.component';

export default [
  { path: '', component: InfoComponent,
    children: [
      { path: 'gameplay', component: InfoGameplayComponent },
      { path: 'mechanics', component: InfoMechanicsComponent },
      { path: 'roles', component: InfoRolesComponent }
    ]
  },
] satisfies Route[];
