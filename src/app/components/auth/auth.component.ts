import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Router, NavigationCancel } from '@angular/router';
import { NavService } from '@services/nav';
import { Subscription, filter } from 'rxjs';
import { Settings, SettingsService } from '@services/settings';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe, NgClass]
})
export class AuthComponent implements OnInit, OnDestroy {
  nav = inject(NavService);

  router = inject(Router);
  routerSubscription: Subscription;

  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = [
    'firstTime',
    'terminalMode'
  ];

  auth = inject(AuthService);
  authMode: string = 'signIn';

  signUpIndicator: string;
  cancelledRoute: string;

  ngOnInit(): void {
    // Check if redirected from the command /cmem; reload to reinit app if so
    if (history.state?.redirectedFromClearMemory) {
      history.replaceState({}, '');
      window.location.reload();
    }

    // Initialize with cancelled route, only if redirected from AuthGuard
    if (history.state?.redirectedFromGuard) { this.setCancelledRoute('init'); }

    if (history.state?.redirectedFromSignUp) { this.signUpIndicator = 'Sign up was successful.'}

    // If already on AuthComponent after an auth-based nav cancellation, update cancelledRoute
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationCancel)
    ).subscribe(() => this.setCancelledRoute());
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }

  disableFirstTime(): void {
    this.settingsService.updateSetting('firstTime', false);
  }

  handleAuth(mode?: string): void {
    // 1. Disable first time mode if still enabled
    if (this.settings['firstTime'] === true) { this.disableFirstTime(); }

    // 2. Check auth mode
    if (mode === 'signUp') {
      history.pushState({ redirectedFromSignUp: true }, '', this.router.url);
      window.location.reload();
    }
    else if (mode === 'signUp') { this.router.navigate(['/home']); }
    else { this.router.navigate(['/home']); }
  }

  setCancelledRoute(arg?: string): void {
    // This jankiness is to accommodate how nav.history works
    const index = arg === 'init' ? -2 : -1;
    const historyItem = this.nav.getHistory().at(index);
    this.cancelledRoute = historyItem && !historyItem.success ? historyItem.route : null;
  }

  switchAuthMode(mode: string): void {
    if (mode === 'signUp') { this.authMode = 'signUp'; }
    else { this.authMode = 'signIn'; }
  }

  onSignOut(): void {
    this.auth.signOut();
  }
}
