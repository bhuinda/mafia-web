import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text = '';
  messages!: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((data: any) => {
      this.messages = data;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.text);
  }
}
