import { Injectable, OnInit, inject } from "@angular/core";
import { environment as env } from '@environments/environment.development';
import Pusher from 'pusher-js';
import { UserService } from "./user";
import { User } from "../models/user";
import { Subscription } from "rxjs";

interface Content {
  text: string;
}

interface Metadata {
  sender: string;
  timestamp: number;
  id: number;
}

// Local; shown to client only
interface LocalMessage {
  metadata: Metadata;
  content: Content;
}

// "Live" using Pusher real-time; shown to client + n
interface LiveMessage extends LocalMessage {
  metadata: Metadata & { receiver: string };
}

// "Live" + "Game" using Pusher real-time
interface GameMessage extends LiveMessage {

}

const warningsConfig = {
  spam: {
    text: "You've sent too many messages recently. Please wait."
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  private user: User;
  private userService = inject(UserService);
  private userSubscription: Subscription;

  private pusher: any;
  private messageCount: number = 0;

  private firstMessageTime: number | null = null;
  private lastMessageTime: number | null = null;

  private messageRateCount: number = 0;
  private messageRateLimited: boolean = false;

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  // Messages for local terminal, no real-time needed
  public async createLocalMessage(input: string): Promise<LocalMessage | null> {
    const now = Date.now();

    if (this.messageRateLimited) {
      if (now - (this.lastMessageTime || 0) < 5000) {
        console.log('You can only send a message every 5 seconds.');
        return null;
      }
    }

    if (this.firstMessageTime === null) {
      this.firstMessageTime = now;
      setTimeout(() => {
        this.firstMessageTime = null;
        this.messageRateCount = 0;
      }, 5000);
    }

    this.messageCount++;

    if (this.messageRateCount >= 5 && now - (this.firstMessageTime || 0) < 5000) {
      this.messageRateLimited = true;
      console.log('You have been limited to sending a message every 5 seconds for the next 20 seconds.');
      setTimeout(() => {
        this.messageRateLimited = false;
      }, 20000);
    }

    this.lastMessageTime = now;

    return {
      metadata: {
        sender: this.user.username,
        timestamp: now,
        id: this.messageCount
      },
      content: {
        text: input
      }
    }
  }

  private createWarningMessage(warningType: string): LocalMessage {
    const now = Date.now();
    const warning = warningsConfig[warningType] ? warningsConfig[warningType] : null;

    this.messageCount++;

    if (warning === null) {
      console.error(`Unknown warning sent to terminal (of type ${warningType})`)
      return {
        metadata: {
          sender: 'system',
          timestamp: now,
          id: this.messageCount
        },
        content: {
          text: 'An unknown warning was detected.'
        }
      }
    }

    return {
      metadata: {
        sender: 'system',
        timestamp: now,
        id: this.messageCount
      },
      content: {
        text: warning.text
      }
    }
  }
}
