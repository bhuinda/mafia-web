import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);

  userSubscription: Subscription;
  user: any;

  getSelectorHTML(page: string): string {
    return `
      <div class="selector">
        [<span class="highlight">${page.toUpperCase()}</span>]
      </div>
    `;
  }

  onBurgerClick(): void {

  }

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
