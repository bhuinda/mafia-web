import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
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

    '/help':{
      action: () => this.placeholderText = `Available commands: ${Object.keys(this.commandList)
        .filter(command => !this.commandListSecrets.includes(command))
        .join(', ')}`
    },

    '/nav': {
      arguments: ['home', 'info', 'game', 'profile', 'settings'],
      action: (argument: string) => {
        if (argument == null) {
          this.placeholderText = `FORMAT: /nav [arg] -- navigates between main pages. ARGs: ${this.commandList['/nav'].arguments.join(', ')}`
          return;
        } else if (!this.commandList['/nav'].arguments.includes(argument)) {
          this.placeholderText = `Argument "${argument}" not found. Try "/nav".`
          return;
        }

        this.placeholderText = this.placeholderDefault;
        this.router.navigateByUrl(`/${argument}`);
      }
    },

    '/credits': {
      action: () => this.placeholderText = 'CREDIT: DarkRevenant | MADE BY: bhuinda'
    },

    '/bhuinda': {
      action: () => {
        this.placeholderText = 'Witness!';

        this.settings.switchSecretMode();
      }
    }

  };
  commandListSecrets = ['/bhuinda'];

  parseCommand(input: string): { command: string, argument: string | null } {
    const parts = input.split(' ');
    return {
      command: parts[0],
      argument: parts.length > 1 ? parts[1] : null
    };
  }

  handleCommand(input: string) {
    const { command, argument } = this.parseCommand(input);
    const commandTarget = this.commandList[command];

    // Check if command exists
    if (!commandTarget) {
      this.placeholderText = `Command "${command}" not found.`
    }

    // Check if command accepts arguments
    if (!commandTarget.arguments && argument) {
      this.placeholderText = `Argument not accepted. Try "${command}".`;
      return;
    }

    commandTarget.action(argument);
  }

  onSubmit() {
    let command = this.commandForm.get('command').value;
    this.commandForm.reset();

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

// If args are provided, there should be a "help" and blank arg that explains how to use the command.
interface Command {
  action: (arg?: any) => void;
  arguments?: any[];
}
