import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private afAuth: AngularFireAuth) {
  }

  isAuthenticated(): boolean {
    const idToken = sessionStorage.getItem('idToken');
    return !this.jwtHelper.isTokenExpired(idToken);
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
