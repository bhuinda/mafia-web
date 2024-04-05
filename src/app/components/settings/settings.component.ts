import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = [
    'terminalMode',
    'backgroundMode',
    'filterMode'
  ]

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  ngOnDestroy(): void {
      this.settingsSubscription.unsubscribe();
  }

  toggleTerminalMode(): void {
    this.settingsService.updateSetting('terminalMode');
  }

  toggleBackgroundMode(): void {
    this.settingsService.updateSetting('backgroundMode');
  }

  toggleFilterMode(): void {
    this.settingsService.updateSetting('filterMode');
  }
}
