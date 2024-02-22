import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type SettingTypes = number | boolean;
type Setting = { [key: string]: SettingTypes };

// Declare settings and their defaults here
const defaultSettings: Setting = {
    terminalMode: true,
    secretMode: false
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: { [key: string]: BehaviorSubject<SettingTypes> } = {};
  private observables: { [key: string]: Observable<SettingTypes> } = {};

  constructor() {
    // Sets settings to their default values or their localStorage values
    for (const key in defaultSettings) {
      this.settings[key] = new BehaviorSubject<SettingTypes>(this.getLocalSetting(key));
      this.observables[key] = this.settings[key].asObservable();
    }
  }

  updateSetting(key: string, value?: number): void {
    if (value != undefined) { this.adjustSetting(key, value); }
    else this.switchSetting(key);
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

  private getLocalSetting(key: string): SettingTypes {
    const localValue = localStorage.getItem(key);

    // If no local value stored yet, return the default value
    if (localValue == null) { return defaultSettings[key]; }

    // If the string value is a number, return a number, otherwise return a boolean
    if (!isNaN(Number(localValue))) { return Number(localValue); }
    else { return localValue == 'true'; }
  }

  private setLocalSetting(key: string, value: SettingTypes): void {
    localStorage.setItem(key, value.toString());
  }

  /* HELPER METHODS FOR SUBSCRIPTION */

  /**
  * Subscribes to a selectable array of settings and executes a callback function upon value changes. Unsubscribe using unsubscribe() in ngDestroy. To update component properties, most elegant solution is to use the callback as so: (key, value) => { this[key] = value }. For best practice, ensure that component properties are already explicitly defined and typed.
  * @param {string[]} keys - Select settings to subscribe to here (see defaultSettings for a list of valid keys).
  * @param {(key: string, value: SettingTypes) => void} callback - Emits any change made to a subscription with its corresponding key-value pair.
  */
  subscribe(keys: string[], callback: (key: string, value: SettingTypes) => void): Subscription[] {
    return keys.map(key => this.observables[key].subscribe(value => callback(key, value)));
  }

  unsubscribe(subscriptions: Subscription[]): void {
    subscriptions.forEach(s => s.unsubscribe());
  }
}
