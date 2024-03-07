import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  constructor() { }

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

  login(email: string, password: string): Observable<any> {
    const payload = JSON.stringify({ email, password });
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.url}/login`, payload, { headers }).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
      })
    );
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}
