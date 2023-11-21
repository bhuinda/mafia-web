import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameRoutingModule } from './game-routing.module';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [
    GameComponent,
    LobbyComponent,
    MatchComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
