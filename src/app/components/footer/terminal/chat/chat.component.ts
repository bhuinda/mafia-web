import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('terminalOutputWrapper') terminalOutputWrapper: ElementRef;
  @ViewChildren('message') messagesHTML: QueryList<ElementRef>;

  messageService = inject(MessageService);
  messageSubscription: Subscription;
  messages: any = [];
  text: string = '';

  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.messageSubscription = this.messageService.messages$.subscribe(messages => this.messages = messages);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage() {
    this.messageService.createLocalMessage(this.text);
    this.cdr.detectChanges();

    this.text = '';
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  scrollToBottom(): void {
    this.terminalOutputWrapper.nativeElement.scrollTop = this.terminalOutputWrapper.nativeElement.scrollHeight;
  }
}
