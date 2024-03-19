import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Settings, SettingsService } from '@app/shared/services/settings';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgClass, DropdownComponent]
})

export class HeaderComponent implements OnInit, OnDestroy {
  dropdownActive = false;

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

  enableDropdown(): void {
    this.dropdownActive = true;
  }
}
