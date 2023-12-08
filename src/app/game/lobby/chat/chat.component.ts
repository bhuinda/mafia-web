import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = '';
  chat: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chat = this.chatService.messages;
  }

  // sendMessage() {
  //   this.chatService.sendMessage(this.message);
  //   this.message = '';
  // }
}
