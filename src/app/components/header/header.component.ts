import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Settings, SettingsService } from '@app/shared/services/settings';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        NgIf,
    ],
})

export class HeaderComponent implements OnInit, OnDestroy {
  user: any;

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['firstTime'];
  settings: Settings = {};

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  getSelectorHTML(page: string): string {
    return `
      <div class="selector">
        [<span class="highlight">${page.toUpperCase()}</span>]
      </div>
    `;
  }

  onBurgerClick(): void {

  }
}
