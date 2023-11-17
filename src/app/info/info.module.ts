import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { InfoRoutingModule } from './info-routing.module';
import { InfoRolesComponent } from './info-roles/info-roles.component';
import { InfoGameplayComponent } from './info-gameplay/info-gameplay.component';
import { InfoMechanicsComponent } from './info-mechanics/info-mechanics.component';

@NgModule({
  declarations: [
    InfoComponent,
    InfoRolesComponent,
    InfoGameplayComponent,
    InfoMechanicsComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
