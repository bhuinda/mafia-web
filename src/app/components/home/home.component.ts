import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class HomeComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);

  statusSubscription: Subscription;
  status: any;
  bannerText: string = "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start."

  now = new Date();
  date: string;

  ngOnInit(): void {
    this.statusSubscription = this.auth.status$.subscribe((status) => {
      this.status = status;
    });
    this.date = (this.now.getMonth() + 1) + '/' + this.now.getDate();
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}
