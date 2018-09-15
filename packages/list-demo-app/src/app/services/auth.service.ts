import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  static isUserLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  socialSignIn(provider: string) {
    let authProvider;

    switch (provider) {
      case 'github': {
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
      }
      case 'google': {
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      }
      default: {
        throw new Error('No valid AuthProvider provided in socialSignIn()-method.');
      }
    }

    return this.afAuth.auth.signInWithPopup(authProvider);
  }

  getIdToken() {
    return this.afAuth.auth.currentUser.getIdToken();
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
