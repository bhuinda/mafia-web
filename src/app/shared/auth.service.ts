import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

export class AuthService {
  isAuthorized = false;

  login() {
    this.isAuthorized = true;
  }

  logout() {
    this.isAuthorized = false;
  }


}
