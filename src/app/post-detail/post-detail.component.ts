import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../core/auth.service";

interface Post {
    titulo: string;
    contenido: string;
}

interface PostId extends Post {
    id: string;
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
    styleUrls: []

})
export class PostDetailComponent implements OnInit {

  postDoc: AngularFirestoreDocument<Post>;
    singlePost: Observable<Post>;
    postId:string;

    userId:string;
    userName:string;
    userEmail:string;

    constructor(
        route: ActivatedRoute,
        private  afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        route.paramMap.subscribe(
            params => this.postId = params.get('postId')
        );

        this.postDoc = this.afs.doc('posts/'+this.postId);
        this.singlePost = this.postDoc.valueChanges();

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
    getPost(postId) {
        console.log(postId);
        this.postDoc = this.afs.doc('posts/'+postId);
        this.singlePost = this.postDoc.valueChanges();
    }
}
