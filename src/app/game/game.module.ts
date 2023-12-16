import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameRoutingModule } from './game-routing.module';
import { MatchComponent } from './match/match.component';
import { ChatComponent } from './lobby/chat/chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameComponent,
    LobbyComponent,
    MatchComponent,
    ChatComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
