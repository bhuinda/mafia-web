import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";
import { BehaviorSubject, catchError, from, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userSubject: BehaviorSubject<any>;

  constructor() {
    this.userSubject = new BehaviorSubject(this.auth.currentUser);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Upon login
        this.userSubject.next(user);
      } else {
        // Upon logout
        this.userSubject.next(null);
      }
    });
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Registration failed.'));
      })
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Login failed.'));
      })
    );
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Logout failed.'));
      })
    );
  }

  get user() {
    return this.userSubject;
  }
}
