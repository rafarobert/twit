import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../core/auth.service";


interface User {
    titulo: string;
    contenido: string;
}

interface UserId extends User {
    id: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: []
})
export class UserProfileComponent implements OnInit {
    userDoc: AngularFirestoreDocument<User>;
    singleUser: Observable<User>;

    userId:string;
    userName:string;
    userEmail:string;

    user:object;

    constructor(
        route: ActivatedRoute,
        private  afs: AngularFirestore,
        private _router: Router,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ){
        this.userDoc = this.afs.doc('users/'+this.userId);
        this.singleUser= this.userDoc.valueChanges();
        this.user = this.singleUser;

        this.afAuth.authState.subscribe(user => {
            if(user){
                this.userId = user.uid;
                this.userEmail = user.email;
                this.userName = user.displayName;
            }
        })
    }

    ngOnInit() {
    }

    getUser(userId) {
        console.log(userId);
        this.userDoc = this.afs.doc('users/'+userId);
        this.singleUser = this.userDoc.valueChanges();
    }
}
