import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
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
}
