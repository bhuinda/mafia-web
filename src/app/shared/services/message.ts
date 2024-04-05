import { Injectable } from "@angular/core";
import Pusher from 'pusher-js';

// Local; shown to client only
interface LocalMessage {
  id: number,
  text: string,
  timestamp: number
}

// "Live" using Pusher real-time; shown to client + n
interface LiveMessage {

}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private pusher: any;
  private messageCount: number = 0;

  private firstMessageTime: number | null = null;
  private lastMessageTime: number | null = null;

  private messageRateCount: number = 0;
  private messageRateLimited: boolean = false;


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
      id: this.messageCount++,
      text: input,
      timestamp: now
    }
  }
}
