import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {AngularFirestore} from "angularfire2/firestore";

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

    constructor(private  afs: AngularFirestore, private _router: Router) {
    }

    ngOnInit() {
    }

    addPost() {
        var id = this.titulo.replace(' ', '-')
        this.afs.collection('posts')
            .doc(id)
            .set({'titulo': this.titulo, 'contenido': this.contenido});
        console.log('Se introdujo un twit: ', this.afs.collection('posts').doc(id));
        this._router.navigate(["/home"]);
    }
}
