import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: true,
    imports: [NgIf, SignInComponent, SignUpComponent]
})
export class AuthComponent implements OnInit, OnDestroy {
  // auth = inject(AuthService);

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
    // this.logoutSubscription = this.auth.logout().subscribe({
    //   next: () => {
    //     this.logoutFailed = false;
    //   },
    //   error: (error) => {
    //     this.logoutFailed = true;
    //     console.log(error);
    //   }
    // });
  }

  ngOnInit(): void {
    // this.userSubscription = this.auth.user.subscribe((user) => {
    //   this.user = user;
    // });
  }

  ngOnDestroy(): void {
  //   this.userSubscription.unsubscribe();
  //   if (this.logoutSubscription) {
  //     this.logoutSubscription.unsubscribe();
  //   }
  }
}
