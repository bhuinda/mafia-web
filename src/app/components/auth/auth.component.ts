import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Router, NavigationCancel } from '@angular/router';
import { NavService } from '@app/shared/services/nav';
import { Subscription, filter } from 'rxjs';
import { Settings, SettingsService } from '@app/shared/services/settings';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe, NgClass]
})
export class AuthComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  nav = inject(NavService);

  router = inject(Router);
  routerSubscription: Subscription;

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['firstTime', 'terminalMode'];
  settings: Settings = {};

  authMode: string = 'login';
  cancelledRoute: string = '';

  ngOnInit(): void {
    this.setCancelledRoute('init');

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationCancel)
    ).subscribe(() => this.setCancelledRoute());

    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  disableFirstTime(): void {
    this.settingsService.updateSetting('firstTime', false);
    this.router.navigate(['/home']);
  }

  setCancelledRoute(arg?: string) {
    const index = arg === 'init' ? -2 : -1;
    const historyItem = this.nav.history.at(index);
    if (historyItem) {
      this.cancelledRoute = !historyItem.success ? historyItem.route : null;
    }
  }

  switchAuthMode(mode: string) {
    if (mode === 'register') { this.authMode = 'register'; }
    else { this.authMode = 'login'; }
  }

  onLogout() {
    this.auth.signOut();
  }
}
