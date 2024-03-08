import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { subscribeOnce } from '../helpers/subscribeOnce';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private router = inject(Router);
  public history: string[] = [];

  public goBack(): void {
    this.history.pop();
  }
}
