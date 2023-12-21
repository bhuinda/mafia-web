import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // Note: consider changing login/register/logout to signin/signup/signout
  // Bug: login/signup template flashes when logged in; workaround needed
  auth = inject(AuthService);
  router = inject(Router);
  authMode = 'login';
  user$ = this.auth.user;
  logoutFailed = false;

  switchAuthMode(mode: string) {
    if (mode == 'register') {
      this.authMode = 'register';
    }
    else {
      this.authMode = 'login';
    }
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.logoutFailed = false;
        this.router.navigateByUrl('/auth');
      },
      error: (error) => {
        this.logoutFailed = true;
        console.log(error);
      }
    });
  }
}
