import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';
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
  settings = inject(SettingsService);
  settingsSubscription: Subscription[];

  // Settings
  secretMode: boolean;

  title = 'hi';

  ngOnInit(): void {
    this.settingsSubscription = this.settings.subscribe(['secretMode'], (key, value) => {
      this[key] = value;
    });
  }

  ngOnDestroy(): void {
    this.settings.unsubscribe(this.settingsSubscription);
  }
}
