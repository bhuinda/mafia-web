import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class HomeComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);

  authStatusSubscription: Subscription;
  authStatus: any;

  now = new Date();
  date: string;

  ngOnInit(): void {
    this.authStatusSubscription = this.auth.status$.subscribe((status) => this.authStatus = status);
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
