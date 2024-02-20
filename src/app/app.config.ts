import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { Routes, provideRouter } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { provideFirestore } from "@angular/fire/firestore";
import { provideAuth } from "@angular/fire/auth";
import { getAuth } from "@firebase/auth";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

const routes: Routes = [
  // Lazy-loaded
  { path: 'home', loadChildren: () => import('./home/routes') },
  { path: 'info', loadChildren: () => import('./info/routes') },
  { path: 'game', loadChildren: () => import('./game/routes') },
  { path: 'profile', loadChildren: () => import('./profile/routes') },
  { path: 'settings', loadChildren: () => import('./settings/routes') },
  // Eager-loaded
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

export const AppConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      BrowserModule,
      ReactiveFormsModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
};
