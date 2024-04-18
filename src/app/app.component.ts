import { Component, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent, NgStyle]
})
export class AppComponent implements OnInit {
  settings: Settings = {};
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = [
    'secretMode',
    'backgroundMode',
    'filterMode',
    'contrastLevel',
    'brightnessLevel',
    'blurLevel'
  ];

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  getStyles() {
    return {
      "filter": `${this.getContrast()} ${this.getBrightness()} ${this.getBlur()}`
    };
  }

  getContrast() {
    return `contrast(${(this.settings['contrastLevel'] as number) / 100})`;
  }

  getBrightness() {
    return `brightness(${(this.settings['brightnessLevel'] as number) / 100})`;
  }

  getBlur() {
    return `blur(${(this.settings['blurLevel'] as number) / 100}px)`;
  }
}
