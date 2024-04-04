import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { SettingsService } from '@services/settings';
import { NavService } from '@services/nav';

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

  settingsService = inject(SettingsService);

  promptDefault: string = 'Awaiting response.';
  prompt: string = this.promptDefault;

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
        this.router.navigate(['/auth'], { state: { redirectedFromClearMemory: true } });
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
        this.prompt = 'Witness!';
        this.settingsService.updateSetting('secretMode');
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
