import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../core/auth.service";
import {Observable} from "rxjs/Observable";
import {User} from "firebase";
interface Post {
    titulo: string;
    contenido: string;
}

interface PostId extends Post {
    id: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {

    postDoc: AngularFirestoreDocument<Post>;
    singlePost: Observable<Post>;
    user:object;
    posts: any;
    postsCol: AngularFirestoreCollection<Post>;

    userId:string;
    userName:string;
    userEmail:string;

    commentContent:string;
    commentTitle:string;

    userDoc: AngularFirestoreDocument<User>;
    singleUser: Observable<User>;

    constructor(
        private  afs: AngularFirestore,
        route: ActivatedRoute,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        this.userDoc = this.afs.doc('users/'+this.userId);
        this.singleUser= this.userDoc.valueChanges();
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.userId = user.uid;
                this.userEmail = user.email;
                this.userName = user.displayName;
            }
        });
    }

  ngOnInit() {
  }

}
