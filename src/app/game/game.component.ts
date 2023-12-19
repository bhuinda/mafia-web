import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  isComponentActive = false;

  onActivate() {
    this.isComponentActive = true;
  }

  onDeactivate() {
    this.isComponentActive = false;
  }
}
