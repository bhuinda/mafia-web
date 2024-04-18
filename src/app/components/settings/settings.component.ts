import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [NgClass, FormsModule]
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = [
    'terminalMode',
    'backgroundMode',
    'filterMode',
    'contrastLevel',
    'brightnessLevel',
    'blurLevel'
  ]

  contrastLevelValue: number;
  brightnessLevelValue: number;
  blurLevelValue: number;

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
    this.contrastLevelValue = this.settings['contrastLevel'] as number;
    this.brightnessLevelValue = this.settings['brightnessLevel'] as number;
    this.blurLevelValue = this.settings['blurLevel'] as number;
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

  setContrastLevel(): void {
    this.settingsService.updateSetting('contrastLevel', this.contrastLevelValue);
  }

  setBrightnessLevel(): void {
    this.settingsService.updateSetting('brightnessLevel', this.brightnessLevelValue);
  }

  setBlurLevel(): void {
    this.settingsService.updateSetting('blurLevel', this.blurLevelValue);
  }

  applySettingsChanges(): void {
    this.setContrastLevel();
    this.setBrightnessLevel();
    this.setBlurLevel();
  }
}
