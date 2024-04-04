import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type Setting = NumberSetting | BooleanSetting;
type SettingValue = number | boolean;

interface BooleanSetting {
  value: boolean
}

interface NumberSetting {
  value: number;
  range: [number, number]
};

export interface Settings {
  [key: string]: SettingValue
};

interface SettingsConfig {
  [key: string]: Setting
};

// DECLARE SETTINGS AND DEFAULTS HERE
const settingsConfig: SettingsConfig = {
  // On very first app load, sets website to "first time" mode and shows welcome screen
  firstTime: {
    value: true
  },
  // Toggles whether terminal displays or not
  terminalMode: {
    value: true
  },
  // Toggles rainbow mode
  secretMode: {
    value: false
  }
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: { [key: string]: BehaviorSubject<SettingValue> } = {};
  public observables: { [key: string]: Observable<SettingValue> } = {};

  constructor() {
    // Sets settings to their default values or their localStorage values
    for (const key in settingsConfig) {
      this.settings[key] = new BehaviorSubject<SettingValue>(this.getLocalSetting(key));
      this.observables[key] = this.settings[key].asObservable();
    }
  }

  /**
   * Subscribes to 1..n settings as a single Subscription object.
   * Define "settingsSubscription: Subscription" and "settings: Settings = {}" as properties with the callback "(key, value) => this.settings[key] = value".
   *
   * @param keys - List setting keys here (see SettingsService.settingsConfig).
   * @param callback - Value changes are sent back as key-value pairs.
   */
  public subscribe(keys: string[], callback: (key: string, value: SettingValue) => void): Subscription {
    const subs = new Subscription();
    keys.forEach(key => {
      const obs = this.observables[key];
      if (obs) { subs.add(obs.subscribe(value => callback(key, value))); }
      else { console.error(`No observable found on key: ${key}`); }
    });
    return subs;
  }

  /**
   * Type-agnostic method to update any setting.
   *
   * @param key - Setting key to update (see SettingsService.settingsConfig).
   * @param value - Leave undefined to toggle a boolean setting; else set to desired value.
   */
  public updateSetting(key: string, value?: SettingValue): void {
    const error = `Setting ${key} failed to update.`;
    // 1. Check if key exists
    if (!this.settings[key]) {
      console.error(`${error} Key was not found.`);
      return;
    }

    // 2. Decide which update method to call; if value is not of type SettingValue, throw an error
    if (typeof value === 'undefined' || typeof value === 'boolean') { this.updateBooleanSetting(key, value as boolean); }
    else if (typeof value === 'number') { this.updateNumberSetting(key, value as number, error); }
    else { console.error(`${error} Value ${value} is of invalid type ${typeof value}.`); }
  }

  private updateBooleanSetting(key: string, value?: boolean): void {
    // If value is undefined, set by toggle; else set by value
    const switchedValue = value !== undefined ? value : !this.settings[key].getValue();

    this.setLocalSetting(key, switchedValue);
    this.settings[key].next(switchedValue);
  }

  private updateNumberSetting(key: string, value: number, error: string): void {
    const setting = settingsConfig[key] as NumberSetting;
    const [min, max] = setting.range;
    // Check if value is outside of configured range
    if (value < min || value > max) {
        console.error(`${error} Value ${value} was outside of acceptable range ${min} to ${max}.`);
        return;
    }

    this.setLocalSetting(key, value);
    this.settings[key].next(value);
  }

  private setLocalSetting(key: string, value: SettingValue): void {
    localStorage.setItem(key, value.toString());
  }

  private getLocalSetting(key: string): SettingValue {
    const localValue = localStorage.getItem(key);

    // If no local value stored yet, return the default value
    if (localValue === null) { return settingsConfig[key].value; }

    // If the string value is a number, return a number; else return a boolean based on string comparison
    const numberValue = Number(localValue);
    return !isNaN(numberValue) ? numberValue : localValue === 'true';
  }
}
