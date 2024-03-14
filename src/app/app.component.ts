import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription, filter } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationCancel, NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgClass } from '@angular/common';
import { AuthService } from '@services/auth';
import { subscribeOnce } from './shared/helpers/subscribeOnce';
import { NavService } from './shared/services/nav';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: true,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  nav = inject(NavService);

  router = inject(Router);
  routerSubscription: Subscription;

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settings: Settings = {};

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) { this.nav.addToHistory(event.urlAfterRedirects, true); }
      else { this.nav.addToHistory(this.router.url, false); }
      console.log('nav', this.nav.history)
    });

    this.settingsSubscription = this.settingsService.subscribe(['secretMode'], (key, value) => {
      this.settings[key] = value;
    });

    // Validate token on app start
    subscribeOnce(this.auth.validateToken());
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }
}
