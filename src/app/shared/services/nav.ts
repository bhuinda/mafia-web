import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { subscribeOnce } from '../helpers/subscribeOnce';
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
    const lastHistoryItem = this.history.pop();
    if (lastHistoryItem) { this.router.navigate([lastHistoryItem.route]); }

    return !!lastHistoryItem;
  }
}
