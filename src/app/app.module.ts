import { AuthInterceptor } from './shared/Interceptors/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {UserService} from './shared/services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/do';



import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true,}
    ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
