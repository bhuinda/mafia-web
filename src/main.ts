import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

const firebaseConfig = {
  apiKey: "AIzaSyCkqYBq3krhnhc50U6IdECblCV9tnNJyzw",
  authDomain: "ng-mafia4web.firebaseapp.com",
  databaseURL: "https://ng-mafia4web-default-rtdb.firebaseio.com",
  projectId: "ng-mafia4web",
  storageBucket: "ng-mafia4web.appspot.com",
  messagingSenderId: "1065272022680",
  appId: "1:1065272022680:web:0ff57c33700cf5dd55e2ed",
  measurementId: "G-48X3FQG9EH"
};

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore()), provideAuth(() => getAuth()), BrowserModule, AppRoutingModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
