import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgClass } from '@angular/common';
import { AuthService } from '@services/auth';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: true,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settings: Settings = {};

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(['secretMode'], (key, value) => {
      this.settings[key] = value;
    });

    // Validate token on app start
    this.auth.validateToken().subscribe();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }
}
