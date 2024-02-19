import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/routes') },
  { path: 'info', loadChildren: () => import('./info/routes') },
  { path: 'game', loadChildren: () => import('./game/routes') },
  { path: 'profile', loadChildren: () => import('./profile/routes') },
  { path: 'settings', loadChildren: () => import('./settings/routes') },

  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
