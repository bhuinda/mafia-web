import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { InfoComponent } from './info/info.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './home/news/news.component';
import { NewsItemComponent } from './home/news/news-item/news-item.component';
import { NewsFeedComponent } from './home/news/news-feed/news-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    InfoComponent,
    SettingsComponent,
    HomeComponent,
    FooterComponent,
    NewsComponent,
    NewsItemComponent,
    NewsFeedComponent,
    ProfileComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
