import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe]
})
export class AuthComponent {
  router = inject(Router);
  auth = inject(AuthService);
  authMode = 'login';

  rerouteError: string;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.rerouteError = navigation.extras.state?.['error'].toUpperCase() || '';
  }

  switchAuthMode(mode: string) {
    if (mode == 'register') {
      this.authMode = 'register';
    }
    else {
      this.authMode = 'login';
    }
  }

  onLogout() {
    this.auth.signOut();
  }
}
