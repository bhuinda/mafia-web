import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth';
import { Settings, SettingsService } from '@services/settings';
import { NavService } from '@services/nav';
import { BehaviorSubject, Subscription, catchError, map, of } from 'rxjs';
import { FriendService } from '@app/shared/services/friend';
import { FriendRequestService } from '@app/shared/services/friend-request';

// If args are provided, there should be a "help" and blank arg that explains how to use the command.
interface Command {
  arguments?: string[];
  action: (args?: any) => void;
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

  friendRequestService = inject(FriendRequestService);
  friendService = inject(FriendService);
  friends: any;

  messageDefault: string = 'Type "/help" for a list of commands.';
  messageCommandSuccess: string = 'Command was successful.';
  message$: BehaviorSubject<string> = new BehaviorSubject<string>(this.messageDefault);

  constructor() {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  commandList: { [name: string]: Command } = {
    // Show available, non-secret commands
    '/help': {
      action: () => {
        this.message$.next(`Available commands: ${Object.keys(this.commandList)
        .filter(command => !this.commandListSecrets.includes(command)) // Filter could be removed if secret & admin commands are moved to separate instance
        .join(', ')}`);
      }
    },

    // Navigate between main pages
    '/nav': {
      arguments: ['home', 'info', 'game', 'profile', 'settings'],
      action: (args?: Argument) => {
        if (!args) {
          this.message$.next(`FORMAT: /nav [arg] -- navigates between main pages. ARGs: ${this.commandList['/nav'].arguments.join(', ')}`);
        }

        if (!this.commandList['/nav'].arguments.includes(args[0])) {
          this.message$.next(`Argument "${args.join(' ')}" not found. Try "/nav".`);
        }

        if (this.router.url === `/${args[0]}`) {
          this.message$.next(`You are already on this page.`);
        }

        this.message$.next(`Navigated to /${args[0]}.`);
        this.router.navigateByUrl(`/${args[0]}`);
      }
    },

    // Navigate backward in history
    '/back': {
      action: () => {
        if (this.nav.back()) { this.message$.next('Traveled backward!'); }
        else { this.message$.next('No navigation history left!'); }
      }
    },

    // === DEBUGGING === //

    // "Clear memory" AKA clear local storage
    '/cmem': {
      action: () => {
        localStorage.clear();
        history.pushState({ redirectedFromClearMemory: true }, '', this.router.url);
        window.location.reload();

        this.message$.next(this.messageCommandSuccess);
      }
    },

    // === FRIENDS === //

    // TO-DO: Fix error handling
    '/friend': {
      arguments: ['request', 'requests', 'remove', 'accept', 'decline', 'list'],
      action: (args?: Argument) => {
        if (!args) {
          this.message$.next(`FORMAT: /friend [arg] [subject] -- manage friends. ARGs: ${this.commandList['/friend'].arguments.join(', ')}`);
        }

        const arg = args[0];
        const argSubject = args[1];

        if (!this.commandList['/friend'].arguments.includes(arg)) {
          this.message$.next(`Argument "${arg}" not found. Try "/friend".`);
        }

        else if (arg === 'list') {
          this.friendService.getFriends()
            .pipe(
              map((response) => {
                console.log(response)
                this.message$.next('FRIENDS =====');
                this.message$.next(`FRIENDS: ${response.map(friend => friend.username).join(', ')}`);
              })
            ).subscribe();
        }

        else if (arg === 'requests') {
          this.friendRequestService.getFriendRequests()
            .pipe(
              map((response) => {
                this.message$.next('FRIEND REQUESTS =====');
                this.message$.next(`INCOMING: ${response.incoming.map(request => request.user.username).join(', ')}`);
                this.message$.next(`OUTGOING: ${response.outgoing.map(request => request.friend.username).join(', ')}`);
              })
            ).subscribe();
        }

        else if (arg === 'request') {
          if (!argSubject) {
            this.message$.next('FORMAT: /friend request [username] -- send friend request.');
            return;
          }

          this.friendRequestService.createFriendRequest(argSubject)
            .pipe(
              map(() => this.message$.next(`Friend request sent to ${argSubject}.`)),
              catchError((error) => {
                console.log(error);
                this.message$.next(error.error.message)
                return of(null);
              })
            ).subscribe();
        }

        else if (arg === 'accept') {
          this.friendRequestService.acceptFriendRequest(argSubject)
            .pipe(
              map(() => this.message$.next(`Accepted ${argSubject}'s friend request.`)),
              catchError((error) => {
                console.log(error);
                this.message$.next(error.error.message)
                return of(null);
              })
            ).subscribe();
        }

        else if (arg === 'decline') {
          this.friendRequestService.declineFriendRequest(argSubject)
            .pipe(
              map(() => this.message$.next(`Declined ${argSubject}'s friend request.`)),
              catchError((error) => {
                console.log(error);
                this.message$.next(error.error.message)
                return of(null);
              })
            ).subscribe();
        }

        else if (arg === 'remove') {
          if (!argSubject) {
            this.message$.next('FORMAT: /friend remove [username] -- remove friend.');
            return;
          }

          this.friendService.removeFriend(argSubject)
            .pipe(
              map(() => this.message$.next(`Removed ${argSubject} from friends.`)),
              catchError((error) => {
                console.log(error);
                this.message$.next(error.error.message)
                return of(null);
              })
            ).subscribe();
        }
      }
    },
    // === MISC === //

    // Show website credits
    '/credits': {
      action: () => {
        this.message$.next('CREDIT: DarkRevenant | MADE BY: bhuinda');
      }
    },

    // === SECRETS === //

    // Toggle rainbow mode
    '/bhuinda': {
      action: () => {
        this.settingsService.updateSetting('secretMode');

        if (this.settings['secretMode']) { this.message$.next("My name is bhuinda, King of Kings: Look on my works, ye Mighty, and despair!"); }
        else { this.message$.next("Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away."); }
      }
    }
  };

  parseCommand(input: string): { name: string, args: Argument } {
    const commandParts = input.split(' ');
    const args = commandParts.slice(1);

    return { name: commandParts[0], args: args.length > 0 ? args : null };
  }

  handleCommand(input: string): void {
    const parsedCommand = this.parseCommand(input);

    const commandName = parsedCommand['name'];
    const commandArgs = parsedCommand['args'];
    const command = this.commandList[commandName];

    // Check if command exists
    if (!command) {
      this.message$.next(`Command "${commandName + (commandArgs ? (' ' + commandArgs) : '')}" not found.`);
      return;
    }

    // Check if command is hidden -- added to circumvent revealing extra info about hidden commands in other guards
    if (this.commandListSecrets.includes(commandName)) {
      if (commandArgs) { command.action(commandArgs); }
      else { command.action(); }
      return;
    }

    // Check if command accepts arguments
    if (!command.arguments && commandArgs) {
      this.message$.next(`Command "${commandName}" does not accept arguments.`);
      return;
    }

    // If everything is fine, execute the command
    if (commandArgs) { command.action(commandArgs); }
    else { command.action(); }
  }

  commandListSecrets = ['/bhuinda'];
};
