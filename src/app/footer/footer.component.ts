import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '../shared/services/settings.service';
import { TerminalComponent } from './terminal/terminal.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [TerminalComponent]
})
export class FooterComponent implements OnInit, OnDestroy {
  settingsService = inject(SettingsService);
  settingsSubscription: Subscription[] = [];
  settings: Settings = {};

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.subscribe(['terminalMode'], (key, value) => {
      this.settings[key] = value;
    });
  }

  ngOnDestroy(): void {
    this.settingsService.unsubscribe(this.settingsSubscription);
  }
}
