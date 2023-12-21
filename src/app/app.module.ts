import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { GameModule } from './game/game.module';
import { InfoModule } from './info/info.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    AuthComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    InfoModule,
    GameModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
