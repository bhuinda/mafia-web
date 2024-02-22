import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SettingsService } from '../shared/services/settings.service';
import { TerminalComponent } from './terminal/terminal.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [NgIf, TerminalComponent]
})
export class FooterComponent implements OnInit, OnDestroy {
  settings = inject(SettingsService);
  settingsSubscription: Subscription[];

  // Settings
  terminalMode: boolean;

  ngOnInit(): void {
    this.settingsSubscription = this.settings.subscribe(['terminalMode'], (key, value) => {
      this[key] = value;
    });
  }

  ngOnDestroy(): void {
    this.settings.unsubscribe(this.settingsSubscription);
  }
}
