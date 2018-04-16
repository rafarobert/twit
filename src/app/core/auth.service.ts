import {ElementRef, Injectable, ViewChild} from "@angular/core";
import {Router} from "@angular/router";

import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap'

interface User {
    uid: string;
    email: string;
    photoUrl?: string;
    displayName?: string;
    posts?:object
}

@Injectable()

export class AuthService {

    user: Observable<User>;
    auth:object;
    email: string;
    password: string;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router) {

        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                } else {
                    return Observable.of(null)
                }
            })
    }

    signUp(email: string, password: string){

        this.afAuth
            .auth
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((credential) => {
                console.log('Se logueo, credenciales: ', credential);
                this.updateUserData(credential.user);
                this.router.navigate(['/posts']);
            })
            .catch(err => {
                console.log('Algo salio mal:',err.message)
            });
    }

    login(email: string, password: string){

        console.log(email);
        this.afAuth
            .auth
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((credential) => {
                this.updateUserData(credential.user);
                this.router.navigate(['/posts']);
            })
            .catch(err => {
                console.log('Algo salio mal:',err.message);
            });
    }

    logout(){
        this.afAuth
            .auth
            .signOut();
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user)
            })
    }

    private updateUserData(user) {
        // Sets user data to firestore on login

        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            posts: user.posts ? user.posts : {}
        }

        return userRef.set(data, { merge: true })

    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

}