import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { Routes, provideRouter } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

const routes: Routes = [
  // Lazy-loaded
  { path: 'home', loadChildren: () => import('./home/home.routes') },
  { path: 'info', loadChildren: () => import('./info/info.routes') },
  { path: 'game', loadChildren: () => import('./game/game.routes') },
  { path: 'profile', loadChildren: () => import('./profile/profile.routes') },
  { path: 'settings', loadChildren: () => import('./settings/settings.routes') },
  // Eager-loaded
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

export const AppConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
};
