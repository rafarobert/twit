import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {AngularFirestore} from "angularfire2/firestore";
import {ActivatedRoute} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
    styleUrls: []
})

export class LoginComponent implements OnInit {
    @ViewChild("txtEmail", {read: ElementRef}) txtEmail: ElementRef;
    @ViewChild("txtPassword", {read: ElementRef}) txtPassword: ElementRef;
    @ViewChild("btnEmail", {read: ElementRef}) btnEmail: ElementRef;

    public titulo: string;
    email: string;
    password: string;
    userId:string;

    constructor(
        private  afs: AngularFirestore,
        route: ActivatedRoute,
        public afAuth: AngularFireAuth,
        public authService: AuthService

    ){
        this.titulo = 'Porfavor Ingresa o Registrate';
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.userId = user.uid;
                this.email = user.email;
            }
        });
    }

    ngOnInit(){
        console.log('Se ha cargado el componente login.ts');
    }

    signUp() {
        if(this.email == undefined){
            this.email = this.txtEmail.nativeElement.value;
        }
        if(this.password == undefined){
            this.password = this.txtPassword.nativeElement.value;
        }
        console.log(this.email);
        console.log(this.password);

        this.authService.signUp(this.email, this.password);
        //this.email = this.password = '';
    }

    login() {
        if(this.email == undefined){
            this.email = this.txtEmail.nativeElement.value;
        }
        if(this.password == undefined){
            this.password = this.txtPassword.nativeElement.value;
        }
        console.log(this.email);
        console.log(this.password);
        this.authService.login(this.email, this.password);
        //this.email = this.password = '';
    }

    logout() {
        this.authService.logout();
    }
}
