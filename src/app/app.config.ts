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

const FIREBASE = {
  apiKey: "AIzaSyCkqYBq3krhnhc50U6IdECblCV9tnNJyzw",
  authDomain: "ng-mafia4web.firebaseapp.com",
  databaseURL: "https://ng-mafia4web-default-rtdb.firebaseio.com",
  projectId: "ng-mafia4web",
  storageBucket: "ng-mafia4web.appspot.com",
  messagingSenderId: "1065272022680",
  appId: "1:1065272022680:web:0ff57c33700cf5dd55e2ed",
  measurementId: "G-48X3FQG9EH"
};

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
      provideFirebaseApp(() => initializeApp(FIREBASE)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      BrowserModule,
      ReactiveFormsModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
};
