import { Injectable, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription, filter, firstValueFrom } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { subscribeOnce } from './shared/helpers/subscribeOnce';
import { NavService } from './shared/services/nav';
import { UserService } from './shared/services/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  auth = inject(AuthService);
  nav = inject(NavService);
  userService = inject(UserService);

  router = inject(Router);
  routerSubscription: Subscription;

  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['firstTime', 'secretMode'];

  async init(): Promise<void> {
    const tokenPromise = firstValueFrom(this.auth.validateToken());
    const userPromise = firstValueFrom(this.userService.getCurrentUser());

    // Wait for token and user to be checked
    await Promise.all([tokenPromise, userPromise]);

    // then...

    // Initialize settings
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);

    // Check if app was opened for the first time
    if (this.settings['firstTime']) { this.router.navigate(['/auth']); }

    // Initialize navigation history manager
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) { this.nav.addToHistory(event.urlAfterRedirects, true); }
      else if (event instanceof NavigationError || event instanceof NavigationCancel) { this.nav.addToHistory(event.url, false); }
    });
  }
}
