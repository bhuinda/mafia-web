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
    const reversedHistory = [...this.history].reverse();

    let successCount = 0;
    for (let i = 0; i < reversedHistory.length; i++) {
      if (reversedHistory[i].success) {
        successCount++;
        if (successCount === 2) {
          this.router.navigate([reversedHistory[i].route]);
          this.history = reversedHistory.slice(i + 1).reverse();
          return true;
        }
      }
    }
    return false;
  }
}
