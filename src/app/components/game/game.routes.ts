import { Route } from '@angular/router';
import { GameComponent } from './game.component';
import { MatchComponent } from './match/match.component';

export default [
  { path: '', component: GameComponent,
    children: [
      { path: 'match', component: MatchComponent }
    ]
  },
] satisfies Route[];
