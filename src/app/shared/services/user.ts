import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  public user$ = new BehaviorSubject<User>(null);
  private userDummy = {
    username: 'guest',
    access_level: 1,
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${this.url}/users/me`)
      .pipe(
        tap((user: any) => this.user$.next(user)),
        catchError(error => {
          console.error('Failed to get current user:', error);
          this.user$.next(this.userDummy);
          return of(error);
        })
      );
  }

  public setUserToDummy(): void {
    this.user$.next(this.userDummy);
  }

  // Fetch all users
  public getUsers(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  // Fetch a single user by id
  public getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`);
  }

  // Fetch a single user by USERNAME
  public findUser(username: string): Observable<any> {
    const payload = {
      "username": username
    };

    return this.http.post(`${this.url}/users/find`, payload)
  }

  // Create a new user
  public createUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  // Update a user
  public updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, user);
  }

  // Delete a user
  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/users/${id}`);
  }
}
