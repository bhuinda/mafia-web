import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

interface HistoryItem {
  route: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private router = inject(Router);

  private history: HistoryItem[] = [];

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
