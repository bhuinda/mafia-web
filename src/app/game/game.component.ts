import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
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
