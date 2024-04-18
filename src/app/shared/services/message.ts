import { Injectable, inject } from "@angular/core";
import { environment as env } from '@environments/environment.development';
import Pusher from 'pusher-js';
import { UserService } from "./user";
import { User } from "../models/user";
import { BehaviorSubject, Subscription } from "rxjs";
import { TerminalService } from "@app/components/footer/terminal/terminal.service";

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
export class MessageService {
  private pusher: any;

  private terminalService = inject(TerminalService);
  private terminalSubscription: Subscription;

  private user: User;
  private userService = inject(UserService);
  private userSubscription: Subscription;

  private messageCount: number = 0;

  // Spam-related properties
  private firstMessageTime: number | null = null;
  private lastMessageTime: number | null = null;
  private messageRateCount: number = 0;
  private messageRateLimited: boolean = false;
  private messageRateTimeout: any;

  // Messages array
  public messages$ = new BehaviorSubject<any>([]);

  constructor() {
    this.userSubscription = this.userService.user$.subscribe(user => this.user = user);
    this.terminalSubscription = this.terminalService.message$.subscribe(message => {
      this.createLocalMessage(message, 'command');
    });
  }

  // Messages for local terminal, no real-time needed
  public async createLocalMessage(input: string, mode?: string): Promise<LocalMessage | void> {
    const now = Date.now();
    let sender = this.user.username;

    // If input is sent as a command, skip spam check and set sender as SYSTEM
    if (mode === 'command') { sender = 'SYSTEM'; }
    else if (this.checkForSpam(now)) { return; }

    this.addMessage({
      metadata: {
        sender: sender,
        timestamp: now,
        id: this.messageCount
      },
      content: {
        text: input
      }
    });
  }

  private checkForSpam(now: number): boolean {
    // If the user has sent 10 or more messages, each within 3 seconds of the last
    if (this.messageRateCount >= 10) {

      // Send a warning and refresh the 10-second timeout
      if (this.messageRateLimited || now - (this.lastMessageTime || 0) < 3000) {
        this.refreshRateLimitTimeout();
        this.messageRateLimited = true;
        this.createWarningMessage('spam');

        return true;
      }
    }

    // If no first message time yet, set it and initiate a timer
    if (this.firstMessageTime === null) {
      this.firstMessageTime = now;
      this.messageRateCount = 1;
    } else {
      this.messageRateCount++;
    }

    // If the user has sent 10 or more messages in less than 3 seconds
    if (this.messageRateCount >= 10 && now - (this.firstMessageTime || 0) < 3000) {
      this.messageRateLimited = true;
    }

    this.lastMessageTime = now;

    return false;
  }

  private refreshRateLimitTimeout(): void {
    if (this.messageRateTimeout) { clearTimeout(this.messageRateTimeout); }

    this.messageRateTimeout = setTimeout(() => {
      this.messageRateLimited = false;
      this.messageRateCount = 0;
      this.firstMessageTime = null;
    }, 10000);
  }

  private createWarningMessage(warningType: string): void {
    const now = Date.now();
    const warning = warningsConfig[warningType] || { text: `Unprocessable warning sent to terminal (of type ${warningType})` };

    this.addMessage({
      metadata: {
        sender: 'SYSTEM',
        timestamp: now,
        id: this.messageCount
      },
      content: {
        text: warning.text
      }
    });
  }

  private addMessage(message: LocalMessage | LiveMessage | GameMessage): void {
    // 1. Increment message count
    this.messageCount++;

    // 2. Add message to messages$
    const currentMessages = this.messages$.getValue();
    currentMessages.push(message);
    this.messages$.next(currentMessages);
  }
}
