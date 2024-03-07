import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent, AsyncPipe]
})
export class AuthComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
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
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  //   this.userSubscription.unsubscribe();
  //   if (this.logoutSubscription) {
  //     this.logoutSubscription.unsubscribe();
  //   }
  }
}
