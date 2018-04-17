import {Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "../core/auth.service";
import {User} from "firebase";

interface Post {
    titulo: string;
    contenido: string;
}

interface PostId extends Post {
    id: string;
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
    styleUrls: []
})

export class PostListComponent implements OnInit {

    @ViewChild("boxComment", {read: ElementRef}) boxComment: ElementRef;

    postDoc: AngularFirestoreDocument<Post>;
    singlePost: Observable<Post>;
    user:object;
    posts: any;
    postsCol: AngularFirestoreCollection<Post>;

    userId:string;
    userName:string;
    userEmail:string;
    userPosts:object;
    userPage:string;

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

        route.paramMap.subscribe(
            params => this.userId = params.get('userId')
        );
        route.paramMap.subscribe(
            params => this.userPage = params.get('page')
        );

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
        console.log(this.userPage);
        console.log(this.userId);
        if(this.userPage == 'propios'){
            this.postsCol = this.afs.collection('users/'+this.userId+'/posts');
        } else if(this.userPage == 'favoritos'){
            this.postsCol = this.afs.collection('users/'+this.userId+'/favoritos');
        } else {
            this.postsCol = this.afs.collection('posts');
        }

        this.posts = this.postsCol.snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Post;
                    const id = a.payload.doc.id;
                    return { id, data};
                });
            });
    }

    setComments(value) : any {
        console.log('setComments');
        let keys = [];
        for (let key1 in value) {
            console.log(key1);
            for (let key2 in value.comentarios) {
                // console.log(key2);
                // keys.push({key: key2, value: value[key2]});
            }
            value.comentarios = keys;
        }
        // return value;
    }

    // addComment(idUser,idPost){
    //     var id = this.titulo.replace(' ','-')
    //     this.afs.collection('posts')
    //         .doc(id)
    //         .set({'titulo': this.titulo, 'contenido': this.contenido});
    //     console.log('Se introdujo un twit: ', this.afs.collection('posts').doc(id));
    // }

    getPost(postId) {
      console.log(postId);
        this.postDoc = this.afs.doc('posts/'+postId);
        this.singlePost = this.postDoc.valueChanges();
    }

    addComment(postId, foreignUserId, foreignUserEmail){
        var data = {
            'id':postId,
            'comentarios':{
                [this.commentTitle]: {
                    'userId':foreignUserId,
                    'userEmail':foreignUserEmail,
                    'userComment': this.commentContent,
                }
            }
        };
        this.afs.collection('posts')
            .doc(postId)
            .set(data,{merge: true});

        var userData = {
            'uid':this.userId,
            'comentarios':{
                [postId]:{
                    'titulo': this.commentTitle,
                    'contenido': this.commentContent,
                }
            }
        };
        this.afs.collection('users')
            .doc(this.userId)
            .set(userData,{merge: true});


        console.log('Se introdujo un Comentario de: '+foreignUserEmail, this.afs.collection('posts').doc(postId));
    }

    doFollowing(userId, userEmail, userName){
        var data = {
            'uid':this.userId,
            'followers':{
                [userId]:{
                    'uid':userId,
                    'email': userEmail,
                    'displayName': userName
                }
            }
        };
        this.afs.collection(
            'users')
            .doc(this.userId)
            .set(data,{ merge: true});

        console.log('Se introdujo un seguidor: ', this.afs.collection('users').doc(userId));
    }

    showBoxComentar(){
        this.boxComment.nativeElement.classList.remove('d-none');
    }
    hideBoxComentar(){
        this.boxComment.nativeElement.classList.add('d-none');
    }
}
