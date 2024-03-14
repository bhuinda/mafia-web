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

  public history: HistoryItem[] = [];

  public addToHistory(route: string, success: boolean): void {
    this.history.push({ route, success });
  }

  public back(): boolean {
    const secondToLastHistoryItem = this.history.at(-2);
    if (secondToLastHistoryItem) {
      // Check if last history item was a failed navigation attempt; if so, remove it to prevent infinite nav loop
      if (!secondToLastHistoryItem.success) { this.history.splice(-2, 2); }

      this.history.splice(-2, 2);
      this.router.navigate([secondToLastHistoryItem.route])
    }

    return !!secondToLastHistoryItem;
  }
}
