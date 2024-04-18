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

  public createFriendRequest(friend: any): Observable<any> {
    let friendId = this.findFriendId(friend);

    const payload = {
      "friend_id": friendId
    }

    return this.http.post(`${this.url}/friend_requests`, payload);
  }

  public rejectFriendRequest(): void {

  }

  public getFriendRequests(): Observable<any> {
    return this.http.get(`${this.url}/friend_requests`);
  }

  // public acceptFriendRequest(friend: string): Observable<any> {
  //   const friendId = this.findFriendId(friend);

  //   return this.http.patch(`${this.url}/friend_requests/${friendId}`)
  // }

  public async findFriendId(friend: string): Promise<number> {
    return subscribeOnce(this.userService.findUser(friend))
      .then(user => user.id)
      .catch(error => {
        console.error(error);
        return null;
      }
    );
  }
}
