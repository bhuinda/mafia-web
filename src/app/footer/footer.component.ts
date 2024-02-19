import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/services/settings.service';
import { TerminalComponent } from './terminal/terminal.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [NgIf, TerminalComponent]
})
export class FooterComponent implements OnInit, OnDestroy {
  settings = inject(SettingsService);

  terminalModeSubscription: Subscription;
  terminalMode: boolean;

  ngOnInit(): void {
    this.terminalModeSubscription = this.settings.terminalMode$.subscribe(mode => {
      this.terminalMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.terminalModeSubscription.unsubscribe();
  }
}
