import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: 'game', component: GameComponent,
    children: [
      { path: 'lobby', component: LobbyComponent },
      { path: '', redirectTo: 'lobby', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
