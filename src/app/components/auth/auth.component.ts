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
    this.setCancelledRoute('init');

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
    const index = arg === 'init' ? -2 : -1;
    const historyItem = this.nav.history.at(index);
    if (historyItem) {
      if (!historyItem.success) {
        this.cancelledRoute = historyItem.route;
        this.nav.history.splice(index, 1); // Remove the cancelled route from history. THIS IS THE PROBLEM CODE IF YOU'RE READING THIS. IT'S TECHNICALLY A BUGFIX, BUT IT MIGHT BECOME A BUG. I'M SORRY, FUTURE ME.
      } else { this.cancelledRoute = null; }
    }
  }

  switchAuthMode(mode: string) {
    if (mode === 'signUp') { this.authMode = 'signUp'; }
    else { this.authMode = 'signIn'; }
  }

  onLogout() {
    this.auth.signOut();
  }
}
