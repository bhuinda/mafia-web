
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@environments/environment'
import { subscribeOnce } from '../helpers/subscribeOnce';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http = inject(HttpClient);
  private url = env.apiUrl;

  private user: User;
  private userService = inject(UserService);
  private userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
  }
}
