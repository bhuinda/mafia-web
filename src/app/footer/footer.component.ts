import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  router = inject(Router);
  auth = inject(AuthService);
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
