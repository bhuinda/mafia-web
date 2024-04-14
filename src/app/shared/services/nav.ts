import { Injectable, OnInit, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface HistoryItem {
  route: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnInit {
  private router = inject(Router);
  private routerSubscription: Subscription;

  private history: HistoryItem[] = [];

  ngOnInit(): void {
    // Initialize navigation history manager
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) { this.addToHistory(event.urlAfterRedirects, true); }
      else if (event instanceof NavigationError || event instanceof NavigationCancel) { this.addToHistory(event.url, false); }
    });
  }

  public getHistory(): HistoryItem[] {
    return this.history;
  }

  public addToHistory(route: string, success: boolean): void {
    this.history.push({ route, success });
  }

  /**
   * Navigate to the last successful, non-redundant view; return true. If no such view exists, return false.
   */
  public back(): boolean {
    for (let i = this.history.length - 1; i >= 0; i--) {
      // 1. If the compared route is the current route, ignore it
      if (this.history[i].route === this.router.url) { continue; }

      // 2. If the compared route was successful, nav to it
      if (this.history[i].success) {
        const route = this.history[i].route;
        this.history = this.history.slice(0, i);
        this.router.navigate([route]);
        return true;
      }
    }

    return false;
  }
}
