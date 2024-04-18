import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user';
import { Observable, Subscription, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@environments/environment'
import { subscribeOnce } from '../helpers/subscribeOnce';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  private http = inject(HttpClient);
  private url = env.apiUrl;

  private user: User;
  private userService = inject(UserService);
  private userSubscription: Subscription;

  private friend: User;

  constructor() {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
  }

  public getFriendRequests(): Observable<any> {
    return this.http.get(`${this.url}/friend_requests`);
  }

  // ACCEPTANCE AND REJECTION

  // public acceptFriendRequest(username: string): Observable<any> {
  //   this.checkFriend(username);

  //   return this.http.patch(`${this.url}/friend_requests/${this.friend.id}`);
  // }

  public createFriendRequest(username: string): Observable<any> {
    return this.checkFriend(username).pipe(
      switchMap(() => {
        const payload = {
          "friend_id": this.friend.id
        }

        return this.http.post(`${this.url}/friend_requests`, payload);
      })
    );
  }

  public rejectFriendRequest(username: string): Observable<any> {
    return this.checkFriend(username).pipe(
      switchMap(friend => this.http.delete(`${this.url}/friend_requests/${friend.id}`))
    );
  }

  private checkFriend(username: string): Observable<User> {
    if (!this.friend || this.friend.username !== username) {
      return this.userService.findUser(username).pipe(
        tap(user => this.friend = user)
      );
    } else {
      return of(this.friend);
    }
  }
}
