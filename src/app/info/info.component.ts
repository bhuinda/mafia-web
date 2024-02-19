import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf]
})
export class InfoComponent {
  isComponentActive = false;

  onActivate() {
    this.isComponentActive = true;
  }

  onDeactivate() {
    this.isComponentActive = false;
  }
}
