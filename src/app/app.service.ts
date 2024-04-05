import { Injectable, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription, filter } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { subscribeOnce } from './shared/helpers/subscribeOnce';
import { NavService } from './shared/services/nav';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  auth = inject(AuthService);
  nav = inject(NavService);

  router = inject(Router);
  routerSubscription: Subscription;

  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['firstTime', 'secretMode'];

  init(): void {
    // 1. Initialize settings
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);

    // 2. Check if app was opened for the first time
    if (this.settings['firstTime']) { this.router.navigate(['/auth']); }

    // 3. Initialize navigation history manager
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) { this.nav.addToHistory(event.urlAfterRedirects, true); }
      else if (event instanceof NavigationError || event instanceof NavigationCancel) { this.nav.addToHistory(event.url, false); }
    });

    // 4. Attempt to validate user token
    subscribeOnce(this.auth.validateToken());
  }
}
