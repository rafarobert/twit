import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// Firebase
import {AngularFireAuthModule, AngularFireAuthProvider} from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFirestore} from "angularfire2/firestore";

// Rutas
import { routing, appRoutingProviders} from "./app.routing";

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostNewComponent } from './post-new/post-new.component';
import { AuthService} from "./core/auth.service";
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot} from "@angular/router";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from "./core/auth.guard";
import {CoreModule} from "./core/core.module";


// Paste in your credentials that you saved earlier
var firebaseConfig = {
    apiKey: "AIzaSyDJpcngwBHO1ICpTq_VfXCvBYcInkerH-c",
    authDomain: "fir-261f1.firebaseapp.com",
    databaseURL: "https://fir-261f1.firebaseio.com",
    projectId: "fir-261f1",
    storageBucket: "fir-261f1.appspot.com",
    messagingSenderId: "218489544638"
};

@NgModule({
  declarations: [
    AppComponent,
      LoginComponent,
      HomeComponent,
      ErrorComponent,
      PostDetailComponent,
      PostListComponent,
      PostNewComponent,
      UserProfileComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      CoreModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireStorageModule,
      AngularFireAuthModule,
  ],
  providers: [
      appRoutingProviders,
      AngularFirestore,
      AuthGuard,
      AuthService,
      FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
