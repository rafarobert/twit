import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
    styleUrls: []
})

export class LoginComponent implements OnInit {
    @ViewChild("txtEmail", {read: ElementRef}) txtEmail: ElementRef;
    @ViewChild("txtPassword", {read: ElementRef}) txtPassword: ElementRef;

    public titulo: string;
    email: string;
    password: string;


    constructor(public authService: AuthService){
        this.titulo = 'Porfavor Ingresa o Registrate';
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
