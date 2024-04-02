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
   * Navigate to the last successful, non-redundant page view.
   */
  public back(): boolean {
    const reversedHistory = [...this.history].reverse();
    for (let i = 1; i < reversedHistory.length; i++) {
      // Guard 1: If the compared route is the current route, ignore it
      if (reversedHistory[i].route === this.router.url) {
        continue;
      }
      // Guard 2: If the compared route was successful, nav to it
      if (reversedHistory[i].success) {
        this.history = reversedHistory.slice(i + 1).reverse();
        this.router.navigate([reversedHistory[i].route]);
        return true;
      }
    }
    return false;
  }
}
