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

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getIdToken() {
    return this.afAuth.auth.currentUser.getIdToken();
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
