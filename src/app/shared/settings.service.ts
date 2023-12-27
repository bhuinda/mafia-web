import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private terminalMode = new BehaviorSubject<boolean>(true);
  terminalMode$ = this.terminalMode.asObservable();

  private secretMode = new BehaviorSubject<boolean>(false);
  secretMode$ = this.secretMode.asObservable();

  switchTerminalMode() {
    this.terminalMode.next(!this.terminalMode.value);
  }

  switchSecretMode() {
    this.secretMode.next(!this.secretMode.value);
  }
}
