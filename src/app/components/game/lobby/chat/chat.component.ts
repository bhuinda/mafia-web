import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from '@services/chat';
import { FormsModule } from '@angular/forms';
import { NgFor, DatePipe } from '@angular/common';
import { MessageService } from '@services/message';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [NgFor, FormsModule, DatePipe]
})
export class ChatComponent implements OnInit, OnDestroy {
  messageService = inject(MessageService);
  messageSubscription: Subscription;
  messages: any = [];
  text: string = '';

  ngOnInit(): void {
    this.messageSubscription = this.messageService.messages$.subscribe(messages => this.messages = messages);
  }

  sendMessage() {
    this.messageService.createLocalMessage(this.text);
    this.text = '';
  }

  ngOnDestroy(): void {
  }
}
