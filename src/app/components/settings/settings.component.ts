import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: true,
    imports: [NgClass]
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settings: Settings = {};

  switchTerminalMode() {
    this.settingsService.updateSetting('terminalMode');
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(['terminalMode'], (key, value) => {
      this.settings[key] = value;
    });
  }

  ngOnDestroy(): void {
      this.settingsSubscription.unsubscribe();
  }
}
