import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "@firebase/auth";
import { BehaviorSubject, catchError, from, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  // Auth section

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    return from(signOut(this.auth))
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  // User section

  get user() {
    return this.userSubject.asObservable();
  }

  updateDisplayName(input: string) {
    const user = this.auth.currentUser;
    const newDisplayName = input.split('@')[0];

    if (user) {
      return from(updateProfile(user, { displayName: newDisplayName }))
        .pipe(
          catchError(error => {
            return throwError(() => error);
          })
        );
    } else {
      return throwError(() => new Error('No user is currently logged in.'));
    }
  }
}
