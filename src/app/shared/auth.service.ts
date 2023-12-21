import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  isAuthorized = false;

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.isAuthorized = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.isAuthorized = true;
        console.log(user);
        console.log(this.isAuthorized);
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {

  }

  user() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
}
