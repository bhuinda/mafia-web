import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  auth = inject(AuthService);
  user$ = this.auth.user;
  now = new Date();
  date!: string;

  ngOnInit(): void {
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }
}
