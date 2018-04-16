import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./core/auth.service";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

    constructor(public afAuth: AngularFireAuth){}
    @ViewChild("btnEmail", {read: ElementRef}) btnEmail: ElementRef;

    ngOnInit(){
        this.afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.btnEmail.nativeElement.innerHTML = user.email;
            } else {
                this.btnEmail.nativeElement.innerHTML = '';
            }
        });
    }
}
