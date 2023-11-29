import { Component } from '@angular/core';

import { ActionVest } from './instance/players/actions/vest';
import Citizen from './instance/resources/locale/en-US/roles/town/citizen.json';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  actionVest = new ActionVest(Citizen.name, Citizen.description, Citizen.msgCommit, Citizen.msgUncommit);
  constructor() {}

  roleName = this.actionVest.name;
  roleDescription = this.actionVest.description;
}
