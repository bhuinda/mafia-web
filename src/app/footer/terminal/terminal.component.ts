import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../shared/settings.service';

// If args are provided, there should be a "help" and blank arg that explains how to use the command.
interface Command {
  arguments?: any[];
  action: (args?: any) => void;
}

type ArgumentPackage = string[] | null;

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy {
  @ViewChild('commandInput') commandInput: ElementRef;

  router = inject(Router);
  auth = inject(AuthService);
  settings = inject(SettingsService);

  terminalModeSubscription: Subscription;
  terminalMode: boolean;

  userSubscription: Subscription;
  user: any;

  placeholderDefault = 'Please enter a command. Try /help for a list of all available commands.';
  placeholderText = this.placeholderDefault;

  commandForm = new FormGroup({
    command: new FormControl('')
  });
  commandList: { [name: string]: Command } = {

    '/help': {
      action: () => { this.placeholderText = `Available commands: ${Object.keys(this.commandList)
        .filter(command => !this.commandListSecrets.includes(command)) // Filter could be removed if secret & admin commands are moved to separate instance
        .join(', ')}`;
      }
    },

    '/nav': {
      arguments: ['home', 'info', 'game', 'profile', 'settings'],
      action: (args: ArgumentPackage) => {
        if (!args) {
          this.placeholderText = `FORMAT: /nav [arg] -- navigates between main pages. ARGs: ${this.commandList['/nav'].arguments.join(', ')}`;
          return;
        }

        if (!this.commandList['/nav'].arguments.includes(args[0])) {
          this.placeholderText = `Argument "${args.join(' ')}" not found. Try "/nav".`;
          return;
        }

        this.placeholderText = this.placeholderDefault;
        this.router.navigateByUrl(`/${args[0]}`);
      }
    },

    '/credits': {
      action: () => {
        this.placeholderText = 'CREDIT: DarkRevenant | MADE BY: bhuinda';
      }
    },

    '/bhuinda': {
      action: () => {
        this.placeholderText = 'Witness!';

        this.settings.switchSetting('secretMode');
      }
    }

  };
  commandListSecrets = [
    '/bhuinda',
  ];

  parseCommand(input: string): { name: string, args: ArgumentPackage } {
    const commandParts = input.split(' ');

    if (commandParts.length == 1) return { name: commandParts[0], args: null };
    else return { name: commandParts[0], args: commandParts.slice(1) };
  }

  handleCommand(input: string) {
    const parsedCommand = this.parseCommand(input);

    const commandName = parsedCommand['name'];
    const commandArgs = parsedCommand['args'];
    const command = this.commandList[commandName];

    // Check if command is hidden -- added to circumvent revealing extra info about hidden com.s in other guards
    if (this.commandListSecrets.includes(commandName)) {
      if (!command.arguments && commandArgs) {
        this.placeholderText = `Command "${commandName + ' ' + commandArgs}" not found.`;
        return;
      }

      command.action(commandArgs);
      return;
    }

    // Check if command exists
    if (!command) {
      this.placeholderText = `Command "${commandName + (commandArgs ? (' ' + commandArgs) : '')}" not found.`;
      return;
    }

    // Check if command accepts arguments
    if (!command.arguments && commandArgs) {
      this.placeholderText = `Argument(s) not accepted. Try "${commandName}".`;
      return;
    }

    command.action(commandArgs);
  }

  onSubmit() {
    const command = this.commandForm.get('command').value;
    this.commandForm.reset();

    // May need to change this to work with other prefixes
    if (!command.startsWith('/')) {
      this.placeholderText = this.placeholderDefault;
      return;
    }

    this.handleCommand(command);
  }

  focusInput() {
    this.commandInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe(user => {
      this.user = user;
    });
    this.terminalModeSubscription = this.settings.terminalMode$.subscribe(mode => {
      this.terminalMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.terminalModeSubscription.unsubscribe();
  }
}
