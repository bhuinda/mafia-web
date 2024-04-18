import { Injectable, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { UserService } from './shared/services/user';
import { UserInfoService } from './shared/services/user-info';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private userInfoService = inject(UserInfoService);

  private router = inject(Router);

  private settings: Settings = {};
  private settingsService = inject(SettingsService);
  private settingsList: string[] = ['firstTime'];

  constructor() {
    this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  public async init(): Promise<void> {
    // 1. Check if app was opened for the first time
    if (this.settings['firstTime']) { this.router.navigate(['/auth']); }

    // 2. Check token => user => user info
    await this.alwaysResolve(firstValueFrom(this.auth.validateToken()));
    await this.alwaysResolve(firstValueFrom(this.userService.getCurrentUser()));
    await this.alwaysResolve(firstValueFrom(this.userInfoService.getCurrentUserInfo()));

    // 3. Remove loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.remove();
  }

  private async alwaysResolve(promise: Promise<any>): Promise<boolean> {
    try { await promise; return true; }
    catch { return true; }
  }
}
