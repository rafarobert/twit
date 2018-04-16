import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";


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
    user:object;

    constructor(
        route: ActivatedRoute,
        private  afs: AngularFirestore,
    ){
        route.paramMap.subscribe(
            params => this.userId = params.get('id')
        );
        this.userDoc = this.afs.doc('users/'+this.userId);
        this.singleUser= this.userDoc.valueChanges();
        this.user = this.singleUser;
    }

    ngOnInit() {
    }

    getUser(userId) {
        console.log(userId);
        this.userDoc = this.afs.doc('users/'+userId);
        this.singleUser = this.userDoc.valueChanges();
    }
}
