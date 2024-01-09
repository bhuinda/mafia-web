import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Settings = 'terminalMode' |
                'secretMode';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings = {
    terminalMode: new BehaviorSubject<boolean>(this.getLocalSetting('terminalMode', true)),
    secretMode: new BehaviorSubject<boolean>(this.getLocalSetting('secretMode', false))
  };

  terminalMode$ = this.settings.terminalMode.asObservable();
  secretMode$ = this.settings.secretMode.asObservable();

  switchSetting(key: Settings) {
    const currentValue = this.settings[key].value;
    this.setLocalSetting(key, !currentValue);
    this.settings[key].next(!currentValue);
  }

  private getLocalSetting(key: string, defaultValue: boolean): boolean {
    const localValue = localStorage.getItem(key);
    return localValue !== null ? localValue === 'true' : defaultValue;
  }

  private setLocalSetting(key: string, value: boolean): void {
    localStorage.setItem(key, value.toString());
  }
}
