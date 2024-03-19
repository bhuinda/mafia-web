import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type Setting = number | boolean;
export interface Settings {
  [key: string]: Setting
};

// Declare settings and their defaults here
const defaultSettings: Settings = {
    terminalMode: true,
    secretMode: false,
    firstTime: false
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: { [key: string]: BehaviorSubject<Setting> } = {};
  public observables: { [key: string]: Observable<Setting> } = {};

  constructor() {
    // Sets settings to their default values or their localStorage values
    for (const key in defaultSettings) {
      this.settings[key] = new BehaviorSubject<Setting>(this.getLocalSetting(key));
      this.observables[key] = this.settings[key].asObservable();
    }
  }

  public updateSetting(key: string, value?: number | boolean): void {
    if (value === undefined || typeof value === 'boolean') { this.switchSetting(key, value as boolean); }
    else { this.adjustSetting(key, value as number); }
  }

  // "switch" => BOOLEAN settings
  private switchSetting(key: string, value?: boolean): void {
    const switchedValue = value !== undefined ? value : !this.settings[key].getValue();
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
    if (localValue === null) { return defaultSettings[key]; }

    // If the string value is a number, return a number; else return a boolean
    if (!isNaN(Number(localValue))) { return Number(localValue); }
    else { return localValue === 'true'; }
  }

  private setLocalSetting(key: string, value: Setting): void {
    localStorage.setItem(key, value.toString());
  }

  /**
  * Subscribes to 1..n settings as a single Subscription object.
  * Define "settingsSubscription: Subscription" and "settings: Settings = {}" as properties with the callback "(key, value) => this.settings[key] = value".
  *
  * @param {string[]} keys - List setting keys here (see SettingsService.defaultSettings).
  * @param {(key: string, value: Setting) => void} callback - Value changes are sent back as key-value pairs.
  */
  public subscribe(keys: string[], callback: (key: string, value: Setting) => void): Subscription {
    const subs = new Subscription();
    keys.forEach(key => {
      const obs = this.observables[key];
      if (obs) { subs.add(obs.subscribe(value => callback(key, value))); }
      else { console.error(`No observable found on key: ${key}`); }
    });
    return subs;
  }
}
