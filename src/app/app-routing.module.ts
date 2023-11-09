import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { InfoComponent } from './info/info.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './home/news/news.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      { path: 'news', component: NewsComponent }
    ]
  },
  { path: 'game', component: GameComponent },
  { path: 'info', component: InfoComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
