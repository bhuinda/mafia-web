import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  isRegistered = true;

  switchAuthMode(mode: string) {
    switch (mode) {
      case 'login':
        this.isRegistered = true;
        break;
      case 'register':
        this.isRegistered = this.isRegistered = false;
        break;
    }
  }

  ngOnInit(): void {
    if (this.auth.isAuthorized) {
      this.router.navigateByUrl('/home');
    }
  }
}
