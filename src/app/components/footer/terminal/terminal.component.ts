import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { Observable } from 'rxjs';
import { SettingsService } from '@services/settings';
import { UserService } from '@services/user';
import { User } from '@models/user';
import { AsyncPipe, NgIf } from '@angular/common';
import { NavService } from '@app/shared/services/nav';

// If args are provided, there should be a "help" and blank arg that explains how to use the command.
interface Command {
  arguments?: string[];
  action: (args?: any) => void;
}

type Argument = string[] | null;

@Component({
    selector: 'terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, AsyncPipe, NgIf]
})
export class TerminalComponent implements OnInit {
  @ViewChild('commandInput') commandInput: ElementRef;

  router = inject(Router);
  nav = inject(NavService);
  auth = inject(AuthService);

  userService = inject(UserService);
  user$: Observable<User>;

  settingsService = inject(SettingsService);

  promptDefault: string = 'Awaiting response.';
  prompt: string = this.promptDefault;

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  commandForm = new FormGroup({ command: new FormControl('') });
  commandList: { [name: string]: Command } = {

    // === UTILITY === //

    // Show available, non-secret commands
    '/help': {
      action: () => {
        this.prompt = `Available commands: ${Object.keys(this.commandList)
        .filter(command => !this.commandListSecrets.includes(command)) // Filter could be removed if secret & admin commands are moved to separate instance
        .join(', ')}`;
      }
    },

    // Navigate between main pages
    '/nav': {
      arguments: ['home', 'info', 'game', 'profile', 'settings'],
      action: (args: Argument) => {
        if (!args) {
          this.prompt = `FORMAT: /nav [arg] -- navigates between main pages. ARGs: ${this.commandList['/nav'].arguments.join(', ')}`;
          return;
        }

        if (!this.commandList['/nav'].arguments.includes(args[0])) {
          this.prompt = `Argument "${args.join(' ')}" not found. Try "/nav".`;
          return;
        }

        if (this.router.url === `/${args[0]}`) {
          this.prompt = `You are already on this page.`;
          return;
        }

        this.prompt = this.promptDefault;
        this.router.navigateByUrl(`/${args[0]}`);
      }
    },

    // Navigate backward in history
    '/back': {
      action: () => {
        if (this.nav.back()) { this.prompt = this.promptDefault; }
        else { this.prompt = 'No navigation history left!'; }
      }
    },

    // === DEBUGGING === //

    // Clear local storage
    '/clear-ls': {
      action: () => {
        localStorage.clear();
        window.location.reload();
      }
    },

    // === MISC === //

    // Show website credits
    '/credits': {
      action: () => {
        this.prompt = 'CREDIT: DarkRevenant | MADE BY: bhuinda';
      }
    },

    // === SECRETS === //

    // Toggle rainbow mode
    '/bhuinda': {
      action: () => {
        this.prompt = 'Witness!';
        this.settingsService.updateSetting('secretMode');
      }
    }

  };
  commandListSecrets = ['/bhuinda'];

  parseCommand(input: string): { name: string, args: Argument } {
    const commandParts = input.split(' ');
    const args = commandParts.slice(1);
    return { name: commandParts[0], args: args.length > 0 ? args : null };
  }

  handleCommand(input: string) {
    const parsedCommand = this.parseCommand(input);

    const commandName = parsedCommand['name'];
    const commandArgs = parsedCommand['args'];
    const command = this.commandList[commandName];

    // Check if command is hidden -- added to circumvent revealing extra info about hidden commands in other guards
    if (this.commandListSecrets.includes(commandName)) {
      if (commandArgs) { command.action(commandArgs); }
      else { command.action(); }
      return;
    }

    // Check if command exists
    if (!command) {
      this.prompt = `Command "${commandName + (commandArgs ? (' ' + commandArgs) : '')}" not found.`;
      return;
    }

    // Check if command accepts arguments
    if (!command.arguments && commandArgs) {
      this.prompt = `Argument(s) not accepted. Try "${commandName}".`;
      return;
    }

    command.action(commandArgs);
  }

  onSubmit() {
    const command = this.commandForm.get('command').value;
    this.commandForm.reset();

    // May need to change this to work with other prefixes
    if (!command.startsWith('/')) {
      this.prompt = this.promptDefault;
      return;
    }

    this.handleCommand(command);
  }

  focusInput() {
    this.commandInput.nativeElement.focus();
  }
}
