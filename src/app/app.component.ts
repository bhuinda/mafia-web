import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './shared/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hi';

  constructor(private data: FirebaseService) {}

  ngOnInit(): void {
  }

  roles$ = this.data.roles;
}
