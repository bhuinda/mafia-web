import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  public userInfo$ = new BehaviorSubject<any>(null);

  public getCurrentUserInfo(): Observable<any> {
    return this.http.get(`${this.url}/user_info`)
      .pipe(
        tap((userInfo: any) => {
          this.userInfo$.next(userInfo);
        }),
        catchError(error => {
          console.error('Failed to get current user:', error);
          return of(error);
        })
      );
  }

  public getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.url}/user_info/${id}`);
  }
}
