
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user';
import { Observable, Subscription, switchMap } from 'rxjs';
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

  public getFriends(): Observable<any> {
    return this.http.get(`${this.url}/friendships`);
  }

  public removeFriend(username: string): Observable<any> {
    return this.userService.findUser(username).pipe(
      switchMap((user) => this.http.delete(`${this.url}/friendships/${user.id}`))
    );
  }
}
