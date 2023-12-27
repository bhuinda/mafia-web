import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);

  userSubscription: Subscription;
  user: any;

  now = new Date();
  date: string;

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe((user) => {
      this.user = user;
    });
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
