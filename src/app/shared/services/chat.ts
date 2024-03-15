import { Injectable, inject } from '@angular/core';
import { environment as env } from '@environments/environment.development'; // fix later
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  pusher: any;
  channel: any;

  listen(userID: number) {
    this.pusher = new Pusher(env.pusher.key, { cluster: env.pusher.cluster });
    this.channel = this.pusher.subscribe(userID.toString());

  }
}

// TO-DO: Refactor so multiple chat instances can be created; currently, every method refers to the same chat object
