import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, NavigationCancel } from '@angular/router';
import { NavService } from '@app/shared/services/nav';
import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe]
})
export class AuthComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  nav = inject(NavService);
  router = inject(Router);
  routerSubscription: Subscription;

  authMode: string = 'login';
  routeCancelled: string = '';

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationCancel)
    ).subscribe(() => this.setNavigationError());
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  setNavigationError(): void {
    const secondToLastHistoryItem = this.nav.history.at(-2);
    if (secondToLastHistoryItem) { this.routeCancelled = !secondToLastHistoryItem.success ? secondToLastHistoryItem.route : null; }
    else { this.routeCancelled = null; }
  }

  switchAuthMode(mode: string) {
    if (mode === 'register') { this.authMode = 'register'; }
    else { this.authMode = 'login'; }
  }

  onLogout() {
    this.auth.signOut();
  }
}
