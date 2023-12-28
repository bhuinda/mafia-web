import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
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
