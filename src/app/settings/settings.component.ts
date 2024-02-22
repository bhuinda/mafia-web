import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '../shared/services/settings.service';
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
  private settingsService = inject(SettingsService);
  private settingsSubscription: Subscription[] = [];
  public settings: Settings = {};

  switchTerminalMode() {
    this.settingsService.updateSetting('terminalMode');
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(['terminalMode'], (key, value) => {
      this.settings[key] = value;
    });
  };

  ngOnDestroy(): void {
    this.settingsService.unsubscribe(this.settingsSubscription);
  }
}
