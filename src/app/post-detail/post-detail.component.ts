import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

import 'rxjs/add/operator/map';

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

    constructor(
        route: ActivatedRoute,
        private  afs: AngularFirestore
    ) {
        route.paramMap.subscribe(
            params => this.postId = params.get('id')
        );
        this.postDoc = this.afs.doc('posts/'+this.postId);
        this.singlePost = this.postDoc.valueChanges();
    }

    ngOnInit() {
    }

}
