import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  getIdToken() {
    return this.afAuth.auth.currentUser.getIdToken();
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
