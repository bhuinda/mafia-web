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
  private pusher: any;

  private user: User;
  private userService = inject(UserService);
  private userSubscription: Subscription;

  private messageCount: number = 0;

  private firstMessageTime: number | null = null;
  private lastMessageTime: number | null = null;

  private messageRateCount: number = 0;
  private messageRateLimited: boolean = false;
  private messageRateTimeout: any;

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  // Messages for local terminal, no real-time needed
  public async createLocalMessage(input: string): Promise<LocalMessage | void> {
    const now = Date.now();

    // If already rate limited, send a warning and return
    if (this.messageRateLimited) {
      if (now - (this.lastMessageTime || 0) < 5000) {
        this.createWarningMessage('spam');
        return;
      }
    }

    // If no first message time yet, set it and initiate a timer
    if (this.firstMessageTime === null) {
      this.firstMessageTime = now;
      this.messageRateCount = 1;

      setTimeout(() => {
        this.firstMessageTime = null;
        this.messageRateCount = 0;
      }, 5000);
    } else {
      this.messageRateCount++;
    }

    // If the user has sent 5 or more messages in less than 5 seconds
    if (this.messageRateCount >= 5 && now - (this.firstMessageTime || 0) < 5000) {
      this.messageRateLimited = true;

      // If timeout is already running, clear it
      if (this.messageRateTimeout) { clearTimeout(this.messageRateTimeout); }

      this.messageRateTimeout = setTimeout(() => {
        this.messageRateLimited = false;
      }, 20000);
    }

    this.lastMessageTime = now;
    this.messageCount++;

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
