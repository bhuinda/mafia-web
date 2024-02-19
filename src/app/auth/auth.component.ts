import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, LoginComponent, RegisterComponent]
})
export class AuthComponent implements OnInit, OnDestroy {
  // Note: consider changing login/register/logout to signin/signup/signout
  auth = inject(AuthService);

  userSubscription: Subscription;
  user: any;

  logoutSubscription: Subscription;
  logoutFailed = false;

  authMode = 'login';

  switchAuthMode(mode: string) {
    if (mode == 'register') {
      this.authMode = 'register';
    }
    else {
      this.authMode = 'login';
    }
  }

  onLogout() {
    this.logoutSubscription = this.auth.logout().subscribe({
      next: () => {
        this.logoutFailed = false;
      },
      error: (error) => {
        this.logoutFailed = true;
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }
}
