import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type Setting = number | boolean;
export type Settings = { [key: string]: Setting };

// Declare settings and their defaults here
const defaultSettings: Settings = {
    terminalMode: true,
    secretMode: false
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: { [key: string]: BehaviorSubject<Setting> } = {};
  private observables: { [key: string]: Observable<Setting> } = {};

  constructor() {
    // Sets settings to their default values or their localStorage values
    for (const key in defaultSettings) {
      this.settings[key] = new BehaviorSubject<Setting>(this.getLocalSetting(key));
      this.observables[key] = this.settings[key].asObservable();
    }
  }

  public updateSetting(key: string, value?: number): void {
    if (value == undefined) { this.switchSetting(key); }
    else { this.adjustSetting(key, value); }
  }

  // "switch" => BOOLEAN settings
  private switchSetting(key: string): void {
    const switchedValue = !this.settings[key].getValue();
    this.setLocalSetting(key, switchedValue);
    this.settings[key].next(switchedValue);
  }

  // "adjust" => NUMBER RANGE settings
  private adjustSetting(key: string, value: number): void {
    this.setLocalSetting(key, value);
    this.settings[key].next(value);
  }

  private getLocalSetting(key: string): Setting {
    const localValue = localStorage.getItem(key);

    // If no local value stored yet, return the default value
    if (localValue == null) { return defaultSettings[key]; }

    // If the string value is a number, return a number; else return a boolean
    if (!isNaN(Number(localValue))) { return Number(localValue); }
    else { return localValue == 'true'; }
  }

  private setLocalSetting(key: string, value: Setting): void {
    localStorage.setItem(key, value.toString());
  }

  // === HELPER METHODS FOR SUBSCRIPTION === //

  /**
  * Subscribes to a selectable array of settings and executes a callback function upon emitted value changes.
  * To update local settings, the most elegant solution is to use the callback: (key, value) => { this.settings[key] = value }. Ensure that this.settings is defined.
  * Unsubscribe using: this.settingsService.unsubscribe(this.settings) in the ngDestroy lifecycle hook.
  *
  * @param {string[]} keys - Select settings to subscribe to here (see defaultSettings for a list of valid keys).
  * @param {(key: string, value: Setting) => void} callback - Emits any change made to a subscription with its corresponding key-value pair.
  */
  public subscribe(keys: string[], callback: (key: string, value: Setting) => void): Subscription[] {
    return keys.map(key => {
      const obs = this.observables[key];
      if (obs) { return obs.subscribe(value => callback(key, value)); }
      else { console.error(`No observable found on key: ${key}`); return null; }
    }).filter(sub => sub != null);
  }

  public unsubscribe(subs: Subscription[]): void {
    subs.forEach(sub => sub.unsubscribe());
  }
}
