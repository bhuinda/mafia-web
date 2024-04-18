import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '@services/user';
import { User } from '@models/user';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TerminalService } from './terminal.service';
import { ChatComponent } from './chat/chat.component';
import { MessageService } from '@app/shared/services/message';

@Component({
    selector: 'terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe, NgIf, ChatComponent, NgClass]
})
export class TerminalComponent implements OnInit {
  @ViewChild('inputContainer') inputContainer: ElementRef;

  terminalService = inject(TerminalService);
  userService = inject(UserService);
  user$: Observable<User>;

  messageService = inject(MessageService);

  expandedTerminal: boolean = false;

  inputForm = new FormGroup({ input: new FormControl('') });

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  onSubmit(): void {
    const input = this.inputForm.get('input').value;
    this.inputForm.reset();

    if (!input) { return; }

    // May need to change this to work with other prefixes
    if (!input.startsWith('/')) {
      this.messageService.createLocalMessage(input);
      return;
    }

    this.terminalService.handleCommand(input);
  }

  focusInput(): void {
    this.inputContainer.nativeElement.focus();
  }

  toggleExpandedTerminal(): void {
    this.expandedTerminal = !this.expandedTerminal;
  }
}
