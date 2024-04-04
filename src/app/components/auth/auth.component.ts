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
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe, NgClass]
})
export class AuthComponent implements OnInit, OnDestroy {
  nav = inject(NavService);

  router = inject(Router);
  routerSubscription: Subscription;

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['firstTime', 'terminalMode'];
  settings: Settings = {};

  auth = inject(AuthService);
  authMode: string = 'signIn';

  cancelledRoute: string = '';

  ngOnInit(): void {
    // Check if redirected from the command /clear-ls; reload to reinit app if so
    if (history.state?.redirectedFromClearMemory) {
      history.replaceState({}, '');
      window.location.reload();
    }

    // Initialize with cancelled route, only if redirected from AuthGuard
    if (history.state?.redirectedFromGuard) { this.setCancelledRoute('init'); }

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
    this.router.navigate(['/home']);
  }

  setCancelledRoute(arg?: string) {
    // This jankiness is to accommodate how nav.history works
    const index = arg === 'init' ? -2 : -1;
    const historyItem = this.nav.getHistory().at(index);
    this.cancelledRoute = historyItem && !historyItem.success ? historyItem.route : null;
  }

  switchAuthMode(mode: string) {
    if (mode === 'signUp') { this.authMode = 'signUp'; }
    else { this.authMode = 'signIn'; }
  }

  onLogout() {
    this.auth.signOut();
  }
}
