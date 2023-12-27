import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private terminalMode = new BehaviorSubject<boolean>(true);
  terminalMode$ = this.terminalMode.asObservable();

  switchTerminalMode() {
    this.terminalMode.next(!this.terminalMode.value);
  }
}
