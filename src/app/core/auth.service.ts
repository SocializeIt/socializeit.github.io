import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { switchMap, switchMapTo, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotifyService } from './notify.service';


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
    private notify: NotifyService,
    private router: Router) { 
      this.user = this.afAuth.authState
        .pipe(
          switchMap(user => {
              return user != null ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);            
          })
        )
  }

  private updateStatus(status: string) {
    if(!this.user) {
      
    }
  }
  emailSignup(email: string, password: string, data?) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userCreds => {
        console.log(userCreds);
        return this.setUserData(userCreds.user, data);
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
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

  setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(data); 
  }

  setUserData(user, data?) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    data.uid = user.uid;
    data.email = user.email
    
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
    this.notify.update(error.message, 'error');
  }
}
