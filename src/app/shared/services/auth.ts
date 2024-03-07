import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  public status$ = new BehaviorSubject<boolean>(false);

  // SIGN UP METHOD


  // SIGN IN/OUT METHODS
  signIn(email: string, password: string): Observable<any> {
    const payload = JSON.stringify({ email, password });
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(`${this.url}/login`, payload, {headers})
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          this.status$.next(true);
        })
      );
  }

  signOut(): void {
    this.destroyToken();
    this.status$.next(false);
  }

  // TOKEN METHODS
  get token(): string | null {
    return localStorage.getItem('token');
  }

  destroyToken(): void {
    localStorage.removeItem('token');
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${this.url}/validate_token`)
      .pipe(
        tap((response: any) => {
          this.status$.next(response.valid)
        }),
        catchError(error => {
          console.error(error);
          return of(false);
        })
      );
  }
}
