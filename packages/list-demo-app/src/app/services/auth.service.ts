import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, NgZone } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
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

    this.afAuth.auth.signInWithPopup(authProvider).then(
      () => this.getIdToken().then(
        (idToken) => {
          sessionStorage.setItem('idToken', idToken);
          this.zone.run(() => this.router.navigateByUrl('/list'));
        }
      )
    );
  }

  emailSignIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => this.getIdToken().then(
        (idToken) => {
          sessionStorage.setItem('idToken', idToken);
          this.zone.run(() => this.router.navigateByUrl('/list'));
        }
      )
    );
  }

  emailSignUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      () => this.getIdToken().then(
        (idToken) => {
          sessionStorage.setItem('idToken', idToken);
          this.zone.run(() => this.router.navigateByUrl('/list'));
        }
      )
    );
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        sessionStorage.removeItem('idToken');
        this.router.navigateByUrl('/home');
      }
    );
  }

  getIdToken() {
    return this.afAuth.auth.currentUser.getIdToken();
  }

}
