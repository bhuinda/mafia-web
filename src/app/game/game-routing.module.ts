import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', component: GameComponent,
    children: [
      { path: 'lobby', component: LobbyComponent },
      { path: 'match', component: MatchComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
