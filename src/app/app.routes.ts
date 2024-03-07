import { Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { authGuard } from './guards/auth'

export const routes: Routes = [
  // Lazy-loaded
  { path: 'home', loadChildren: () => import('./components/home/home.routes') },
  { path: 'info', loadChildren: () => import('./components/info/info.routes') },
  { path: 'game', loadChildren: () => import('./components/game/game.routes'), canActivate: [authGuard] },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.routes'), canActivate: [authGuard] },
  { path: 'settings', loadChildren: () => import('./components/settings/settings.routes') },
  // Eager-loaded
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
]
