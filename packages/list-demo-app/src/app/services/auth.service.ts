import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, NgZone } from '@angular/core';
import { ListUser } from '../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    afAuth.authState.subscribe(
      (data) => this.user = data
    );
  }

  static getAuthProviderById(providerId: string): firebase.auth.AuthProvider {
    switch (providerId) {
      case 'github': {
        return new firebase.auth.GithubAuthProvider();
      }
      case 'google': {
        return new firebase.auth.GoogleAuthProvider();
      }
      default: {
        throw new Error('No valid AuthProvider provided.');
      }
    }
  }

  getProviderId(): string {
    return this.user.providerData[0].providerId;
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isAuthenticated(): boolean {
    return !(this.user === null || this.user === undefined);
  }

  getIdToken(): Promise<string> | null {
    return this.isAuthenticated() ? this.user.getIdToken() : null;
  }

  reauthenticate(password: string = null): Promise<firebase.auth.UserCredential> {
    const providerId = this.getProviderId();

    if (providerId === 'password') {
      const cred = firebase.auth.EmailAuthProvider.credential(this.user.email, password);
      return this.user.reauthenticateAndRetrieveDataWithCredential(cred);
    } else {
      return this.user.reauthenticateWithPopup(AuthService.getAuthProviderById(providerId));
    }
  }

  socialSignIn(provider: string): Promise<boolean> | Error {
    return this.afAuth.auth.signInWithPopup(AuthService.getAuthProviderById(provider)).then(
      () => this.zone.run(() => this.router.navigateByUrl('/list'))
    );
  }

  emailSignIn(email: string, password: string): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => this.zone.run(() => this.router.navigateByUrl('/list'))
    );
  }

  emailSignUp(user: ListUser): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      () => {
        this.setProfile(user.name, user.surname);
        // TODO: Add E-Mail-Verification (send E-Mail to user)
        // this.getCurrentUser().sendEmailVerification().then(() => console.log('Email sent to: ', email));
        this.zone.run(() => this.router.navigateByUrl('/list'));
      }
    );
  }

  updateProfile(password: string, name: string, surname: string): Promise<void> {
    return this.reauthenticate(password).then(
      () => this.setProfile(name, surname)
    );
  }

  setProfile(name: string, surname: string, photoURL = null) {
    const displayName = [name, surname].join(' ');
    this.getAuthState().subscribe(
      (user) => {
        if (user) {
          user.updateProfile({displayName, photoURL});
        }
      }
    );
  }

  changePassword(password: string, passwordNew: string): Promise<void> {
    return this.reauthenticate(password).then(
      (userCred) => userCred.user.updatePassword(passwordNew)
    );
  }

  deleteUserAccount(password: string): Promise<boolean> {
    return this.reauthenticate(password).then(
      (userCred) => userCred.user.delete().then(
        () => this.zone.run(() => this.router.navigateByUrl('/home'))
      )
    );
  }

  signOut(): Promise<boolean> {
    return this.afAuth.auth.signOut().then(
      () => this.router.navigateByUrl('/home'));
  }

}
