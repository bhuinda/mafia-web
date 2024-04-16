import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { Settings, SettingsService } from '@services/settings';
import { NavService } from '@services/nav';
import { Subscription } from 'rxjs';
import { FriendService } from '@app/shared/services/friend';

// If args are provided, there should be a "help" and blank arg that explains how to use the command.
interface Command {
  arguments?: string[];
  action: (args?: any) => string;
}

type Argument = string[] | null;

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  router = inject(Router);
  nav = inject(NavService);
  auth = inject(AuthService);

  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = [
    'secretMode'
  ];

  friendService = inject(FriendService);
  friends: any;

  promptDefault: string = 'Awaiting response.';
  prompt: string = this.promptDefault;

  constructor() {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  commandList: { [name: string]: Command } = {
    // Show available, non-secret commands
    '/help': {
      action: () => {
        this.prompt = `Available commands: ${Object.keys(this.commandList)
        .filter(command => !this.commandListSecrets.includes(command)) // Filter could be removed if secret & admin commands are moved to separate instance
        .join(', ')}`;
        return this.prompt;
      }
    },

    // Navigate between main pages
    '/nav': {
      arguments: ['home', 'info', 'game', 'profile', 'settings'],
      action: (args: Argument) => {
        if (!args) {
          this.prompt = `FORMAT: /nav [arg] -- navigates between main pages. ARGs: ${this.commandList['/nav'].arguments.join(', ')}`;
          return this.prompt;
        }

        if (!this.commandList['/nav'].arguments.includes(args[0])) {
          this.prompt = `Argument "${args.join(' ')}" not found. Try "/nav".`;
          return this.prompt;
        }

        if (this.router.url === `/${args[0]}`) {
          this.prompt = `You are already on this page.`;
          return this.prompt;
        }

        this.prompt = this.promptDefault;
        this.router.navigateByUrl(`/${args[0]}`);
        return this.prompt;
      }
    },

    // Navigate backward in history
    '/back': {
      action: () => {
        if (this.nav.back()) { this.prompt = this.promptDefault; }
        else { this.prompt = 'No navigation history left!'; }
        return this.prompt;
      }
    },

    // === DEBUGGING === //

    // "Clear memory" AKA clear local storage
    '/cmem': {
      action: () => {
        localStorage.clear();
        history.pushState({ redirectedFromClearMemory: true }, '', this.router.url);
        window.location.reload();

        return this.prompt;
      }
    },

    // === FRIENDS === //
    '/friend': {
      action: () => {
        this.friendService.getFriendRequests().subscribe(
          response => console.log(response)
        );
        return this.prompt;
      }
    },

    // === MISC === //

    // Show website credits
    '/credits': {
      action: () => {
        this.prompt = 'CREDIT: DarkRevenant | MADE BY: bhuinda';
        return this.prompt;
      }
    },

    // === SECRETS === //

    // Toggle rainbow mode
    '/bhuinda': {
      action: () => {
        this.settingsService.updateSetting('secretMode');

        if (this.settings['secretMode']) { this.prompt = "My name is bhuinda, King of Kings: Look on my works, ye Mighty, and despair!" }
        else { this.prompt = "Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away." }

        return this.prompt;
      }
    }
  };

  parseCommand(input: string): { name: string, args: Argument } {
    const commandParts = input.split(' ');
    const args = commandParts.slice(1);

    return { name: commandParts[0], args: args.length > 0 ? args : null };
  }

  handleCommand(input: string): string {
    const parsedCommand = this.parseCommand(input);

    const commandName = parsedCommand['name'];
    const commandArgs = parsedCommand['args'];
    const command = this.commandList[commandName];

    // Check if command is hidden -- added to circumvent revealing extra info about hidden commands in other guards
    if (this.commandListSecrets.includes(commandName)) {
      if (commandArgs) { command.action(commandArgs); }
      else { command.action(); }
      return this.prompt;
    }

    // Check if command exists
    if (!command) {
      this.prompt = `Command "${commandName + (commandArgs ? (' ' + commandArgs) : '')}" not found.`;
      return this.prompt;
    }

    // Check if command accepts arguments
    if (!command.arguments && commandArgs) {
      this.prompt = `Argument(s) not accepted. Try "${commandName}".`;
      return this.prompt;
    }

    return command.action(commandArgs);
  }
  commandListSecrets = ['/bhuinda'];
};
