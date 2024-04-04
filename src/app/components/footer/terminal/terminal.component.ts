import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '@services/user';
import { User } from '@models/user';
import { AsyncPipe, NgIf } from '@angular/common';
import { TerminalService } from './terminal.service';

@Component({
    selector: 'terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe, NgIf]
})
export class TerminalComponent implements OnInit {
  @ViewChild('commandInput') commandInput: ElementRef;

  terminalService = inject(TerminalService);
  userService = inject(UserService);
  user$: Observable<User>;

  commandForm = new FormGroup({ command: new FormControl('') });

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  onSubmit(): void {
    const command = this.commandForm.get('command').value;
    this.commandForm.reset();

    // May need to change this to work with other prefixes
    if (!command.startsWith('/')) {
      return;
    }

    this.terminalService.handleCommand(command);
  }

  focusInput(): void {
    this.commandInput.nativeElement.focus();
  }
}
