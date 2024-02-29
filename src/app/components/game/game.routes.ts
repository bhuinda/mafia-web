import { Route } from '@angular/router';
import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MatchComponent } from './match/match.component';

export default [
  { path: '', component: GameComponent,
    children: [
      { path: 'lobby', component: LobbyComponent },
      { path: 'match', component: MatchComponent }
    ]
  },
] satisfies Route[];
