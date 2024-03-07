import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.url}/users/me`);
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
