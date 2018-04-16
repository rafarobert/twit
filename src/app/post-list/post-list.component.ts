import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';

interface Post {
    titulo: string;
    contenido: string;
}

interface PostId extends Post {
    id: string;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
    styleUrls: []
})

export class PostListComponent implements OnInit {

    postDoc: AngularFirestoreDocument<Post>;
    singlePost: Observable<Post>;

    postsCol: AngularFirestoreCollection<Post>;
//    posts: Observable<Post[]>;
    posts: any;

    titulo:string;
    contenido:string;

    constructor(private  afs: AngularFirestore) {

    }

    ngOnInit() {
        this.postsCol = this.afs.collection('posts');
//        this.posts = this.postsCol.valueChanges();

        this.posts = this.postsCol.snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Post;
                    const id = a.payload.doc.id;
                    return { id, data};
                });
            });
    }

    addPost(){
        var id = this.titulo.replace(' ','-')
        this.afs.collection('posts')
            .doc(id)
            .set({'titulo': this.titulo, 'contenido': this.contenido});
        console.log('Se introdujo un twit: ', this.afs.collection('posts').doc(id));
    }

    getPost(postId) {
      console.log(postId);
        this.postDoc = this.afs.doc('posts/'+postId);
        this.singlePost = this.postDoc.valueChanges();
    }

    comentar(postId){

    }
}
