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
  * Subscribes to one or more settings and executes a callback upon emitted value changes.
  * As a single Subscription object, this implementation doesn't allow for the targeting of individual subscriptions.
  * Recommended boilerplate is to define "settingsSubscription: Subscription" and "settings: Settings = {}" as properties with the callback, (key, value) => { this.settings[key] = value }.
  *
  * @param {string[]} keys - Select settings to subscribe to here (see defaultSettings for a list of valid keys).
  * @param {(key: string, value: Setting) => void} callback - Emits any change made to a subscription with its corresponding key-value pair.
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
