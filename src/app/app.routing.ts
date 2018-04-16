import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, UrlSegment} from "@angular/router";

// Componentes
import { HomeComponent } from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import {LoginComponent} from "./login/login.component";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {PostNewComponent} from "./post-new/post-new.component";
import {AuthGuard} from "./core/auth.guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const appRoutes: Routes = [
    {path: '', component: LoginComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent },
    {path: 'home', component:HomeComponent},
    {path: 'perfil', component:UserProfileComponent, canActivate: [AuthGuard] },
    {path: 'posts', component:PostListComponent,canActivate: [AuthGuard] },
    {path: 'posts/nuevo', component:PostNewComponent, canActivate: [AuthGuard] },
    {path: 'posts/:id', component:PostDetailComponent, canActivate: [AuthGuard] },
    {path: '**', component: ErrorComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
