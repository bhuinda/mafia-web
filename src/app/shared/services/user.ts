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

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.url}/users/me`)
      .pipe(
        tap((user: any) => this.user$.next(user)),
        catchError(error => {
          console.error('Failed to get current user:', error);
          const dummyUser = {
            username: 'guest',
            access_level: 1,
          };
          this.user$.next(dummyUser);
          return of(dummyUser);
        })
      );
  }

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  // Fetch a single user by id
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  // Update a user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/users/${id}`);
  }
}
