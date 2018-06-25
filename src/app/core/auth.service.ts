import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { switchMap, switchMapTo, map } from 'rxjs/operators';
import { of } from 'rxjs';


interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayname?: string;
  favoriteColor?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, 
    private router: Router) { 
      this.user = this.afAuth.authState
        .pipe(
          switchMap(user => {
              return user != null ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);            
          })
        )
  }

  emailSignup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserData(user);
      })
      .catch(error => this.handleError(error));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user)
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.id}`);
    const data = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(data); 
  }

  updateUser (user, data) {
    return this.afs.doc(`users/${user.uid}`).update(data);
  }
  
  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayname: user.displayname,
      photoUrl: user.photoUrl
    };

    return userRef.set(data);
  }

  handleError(error) {
    console.log(error);
    // this.notify.update(error.message, 'error');
  }
}
