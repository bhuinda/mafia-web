import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, NgStyle, RouterOutlet]
})
export class GameComponent {
  cdr = inject(ChangeDetectorRef); // To fix ExpressionChangedAfterItHasBeenCheckedError
  isComponentActive = false;

  onActivate() {
    this.isComponentActive = true;
    this.cdr.detectChanges();
  }

  onDeactivate() {
    this.isComponentActive = false;
    this.cdr.detectChanges();
  }
}
