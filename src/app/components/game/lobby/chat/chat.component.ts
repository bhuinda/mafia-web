import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ChatService } from '@services/chat';
import { FormsModule } from '@angular/forms';
import { NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [NgFor, FormsModule, DatePipe]
})
export class ChatComponent implements OnInit, OnDestroy {
  // chatService = inject(ChatService);
  text = '';
  messages;

  ngOnInit(): void {
    // this.chatService.getMessages().subscribe((data) => {
    //   this.messages = data.sort((a: any, b: any) =>
    //     new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    //   );
    // });
  }

  sendMessage() {
    // this.chatService.sendMessage(this.text);
    this.text = '';
  }

  ngOnDestroy(): void {
    // This implementation is flawed; in future, only delete messages in chat collection when lobby reaches 0 players, e.g. check for playerCount == 0.
    // this.chatService.deleteMessages();
  }
}
