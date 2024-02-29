import { importProvidersFrom, ApplicationConfig,  } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter, Routes,  } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { AuthComponent } from "./components/auth/auth.component";
import { environment } from "src/environments/environment.development";

const routes: Routes = [
  // Lazy-loaded
  { path: 'home', loadChildren: () => import('./components/home/home.routes') },
  { path: 'info', loadChildren: () => import('./components/info/info.routes') },
  { path: 'game', loadChildren: () => import('./components/game/game.routes') },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.routes') },
  { path: 'settings', loadChildren: () => import('./components/settings/settings.routes') },
  // Eager-loaded
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

export const AppConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
};
