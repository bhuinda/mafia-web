import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { UserService } from './user';
import { subscribeOnce } from '../helpers/subscribeOnce';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;
  private userService = inject(UserService);

  public status$ = new BehaviorSubject<boolean>(false);

  // SIGN UP METHOD
  signUp(username: string, email: string, password: string) {
    const payload = JSON.stringify({
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    });
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(`${this.url}/users`, payload, {headers});
  }

  // SIGN IN/OUT METHODS
  signIn(email: string, password: string): Observable<any> {
    const payload = JSON.stringify({
      "user": {
        "email": email,
        "password": password
      }
    });
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(`${this.url}/login`, payload, {headers}).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        subscribeOnce(this.validateToken());
        subscribeOnce(this.userService.getCurrentUser());
      })
    );
  }

  signOut(): void {
    this.destroyToken();
    this.userService.setUserToDummy();
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
    return this.http.get(`${this.url}/validate_token`).pipe(
      tap((response: any) => this.status$.next(response.valid)),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }
}
