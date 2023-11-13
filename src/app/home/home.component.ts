import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  now = new Date();
  date!: string;

  ngOnInit(): void {
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }
}
