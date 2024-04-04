import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Settings, SettingsService } from '@services/settings';
import { Subscription } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgClass } from '@angular/common';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  appService = inject(AppService);

  settingsService = inject(SettingsService);
  settingsSubscription: Subscription;
  settingsList: string[] = ['secretMode'];
  settings: Settings = {};

  bgImageIsLoaded: boolean = false;

  ngOnInit(): void {
    this.appService.init();
    this.settingsSubscription = this.settingsService.subscribe(this.settingsList, (key, value) => this.settings[key] = value);
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }
}
