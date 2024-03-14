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
    const lastRoute = this.history.at(-2);
    if (lastRoute) {
      if (lastRoute.success) {
        this.history.splice(-2, 2);
        this.router.navigate([lastRoute.route]);
        return true;
      } else { // If the last route was not successful, remove it and try again (using recursion)
        this.history.splice(-2, 2);
        return this.back();
      }
    }

    return !!lastRoute;
  }
}
