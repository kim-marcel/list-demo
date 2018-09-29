import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    afAuth.authState.subscribe((data) => {
      this.user = data;
    });
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  isAuthenticated(): boolean {
    return !(this.user === null || this.user === undefined);
  }

  getIdToken() {
    return this.isAuthenticated() ? this.user.getIdToken() : null;
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
      () => this.zone.run(() => this.router.navigateByUrl('/list'))
    );
  }

  emailSignIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => this.zone.run(() => this.router.navigateByUrl('/list'))
    );
  }

  emailSignUp(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      () => {
        this.updateUserInfo(user.name, user.surname);
        // TODO: Add E-Mail-Verification (send E-Mail to user)
        // this.getCurrentUser().sendEmailVerification().then(() => console.log('Email sent to: ', email));
        this.zone.run(() => this.router.navigateByUrl('/list'));
      }
    );
  }

  updateUserInfo(name: string, surname: string, photoURL = null) {
    const displayName = [name, surname].join(' ');
    this.getAuthState().subscribe(
      (user) => user.updateProfile({displayName, photoURL})
    );
  }

  changePassword(password: string, passwordNew: string) {
    const cred = firebase.auth.EmailAuthProvider.credential(this.user.email, password);
    this.user.reauthenticateAndRetrieveDataWithCredential(cred).then(
      (userCred) => {
        userCred.user.updatePassword(passwordNew).then(
          () => console.log('Password changed successfully')
        );
      }
    );
  }

  signOut() {
    this.afAuth.auth.signOut().then(
      () => this.router.navigateByUrl('/home'));
  }

}
