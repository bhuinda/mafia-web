import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settings = inject(SettingsService);

  terminalModeSubscription: Subscription;
  terminalMode: boolean;

  switchTerminalMode() {
    this.settings.switchSetting('terminalMode');
  }

  ngOnInit(): void {
    this.terminalModeSubscription = this.settings.terminalMode$.subscribe(mode => {
      this.terminalMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.terminalModeSubscription.unsubscribe();
  }
}
