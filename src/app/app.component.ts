import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from './shared/services/settings.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: true,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription[] = [];
  settings: Settings = {};

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(['secretMode'], (key, value) => {
      this.settings[key] = value;
    });
  }

  ngOnDestroy(): void {
    this.settingsService.unsubscribe(this.settingsSubscription);
  }
}
