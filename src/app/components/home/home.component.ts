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

  statusSubscription: Subscription;
  status: any;

  now = new Date();
  date: string;

  ngOnInit(): void {
    this.statusSubscription = this.auth.status$.subscribe((status) => {
      this.status = status;
    });
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}