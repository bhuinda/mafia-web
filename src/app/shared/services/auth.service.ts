import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseURL = 'http://localhost:3000';

  constructor() { }

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/users`);
  }

  // Fetch a single user by id
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${id}`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users`, user);
  }

  // Update a user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseURL}/users/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${id}`);
  }
}
