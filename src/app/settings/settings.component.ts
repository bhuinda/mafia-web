import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SettingsService } from '../shared/services/settings.service';
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
  settings = inject(SettingsService);
  settingsSubscription: Subscription[];

  // Settings
  terminalMode: boolean;

  switchTerminalMode() {
    this.settings.updateSetting('terminalMode');
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settings.subscribe(['terminalMode'], (key, value) => {
      this[key] = value;
    });
  }

  ngOnDestroy(): void {
    this.settings.unsubscribe(this.settingsSubscription);
  }
}
