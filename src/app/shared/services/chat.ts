import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '@environments/environment.development'; // fix later
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  http = inject(HttpClient);

  pusher: any;
  channel: any;

  listen(userID: number) {
    this.pusher = new Pusher(env.pusher.key, { cluster: env.pusher.cluster });
    this.channel = this.pusher.subscribe(userID.toString());
  }

  getMessages(): Observable<any> {
    return this.http.get('http://localhost:3000/messages');
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post('http://localhost:3000/messages', { content: message });
  }

  subscribeToNewMessages(callback: (message: any) => void): void {
    this.channel.bind('new_message', callback);
  }

  unsubscribeFromNewMessages(): void {
    this.channel.unbind('new_message');
  }
}
