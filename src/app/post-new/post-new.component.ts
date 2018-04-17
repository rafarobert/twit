import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFirestore} from "angularfire2/firestore";
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
    selector: 'app-post-new',
    templateUrl: './post-new.component.html',
    styleUrls: []
})

export class PostNewComponent implements OnInit {

    posts: any;
    titulo: string;
    contenido: string;
    user:object;

    userId:string;
    userName:string;
    userEmail:string;

    constructor(
        private  afs: AngularFirestore,
        private _router: Router,
        route: ActivatedRoute,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
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

    addPost(idUser,email) {
        var id = this.titulo.replace(/ /g,"-")
        this.afs.collection('posts')
            .doc(id)
            .set({'titulo': this.titulo, 'contenido': this.contenido, 'idUser':idUser, 'auth': email,'comentarios':[]});

        var userData = {
            'uid':idUser,
            'posts':{
                [id]:{
                    'titulo': this.titulo,
                    'contenido': this.contenido,
                    'idUser':idUser, 'auth':
                    email,'comentarios':[]
                }
            }
        };
        this.afs.collection('users')
            .doc(this.userId)
            .set(userData,{merge: true});

        console.log('Se introdujo un twit: ', this.afs.collection('posts').doc(id));
        this._router.navigate(["/posts"]);
    }
}
