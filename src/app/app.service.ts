import { Injectable, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { UserService } from './shared/services/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private auth = inject(AuthService);
  private userService = inject(UserService);

  private router = inject(Router);

  private settings: Settings = {};
  private settingsService = inject(SettingsService);
  private settingsSubscription: Subscription;
  private settingsList: string[] = ['firstTime'];

  constructor() {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  public async init(): Promise<void> {
    // Check if app was opened for the first time
    if (this.settings['firstTime']) { this.router.navigate(['/auth']); }

    // Check token, user
    const tokenPromise = this.alwaysResolve(firstValueFrom(this.auth.validateToken()));
    const userPromise = this.alwaysResolve(firstValueFrom(this.userService.getCurrentUser()));

    await Promise.all([tokenPromise, userPromise]);

    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.remove();
  }

  private async alwaysResolve(promise: Promise<any>): Promise<boolean> {
    try { await promise; return true; }
    catch { return true; }
  }
}
