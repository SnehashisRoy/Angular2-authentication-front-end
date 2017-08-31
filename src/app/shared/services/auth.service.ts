import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {

  private url:string = "http://RestAuth.app/oauth/token";
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) { 
    this.loggedIn= !!localStorage.getItem('auth_token');
  }

  login(credential: object):Observable<any>{
    return this.http.post(this.url, credential )
           .map(res=>res['access_token'])
           .do(res =>{
              if(res){
            this.loggedIn= true;
            localStorage.setItem('auth_token', res);
           }
           })
           .catch(this.handleError);
  }
  
  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;

  }
  loggInStatus(){
    return this.loggedIn;
  }

  getAuthorizationHeader(){
        let token   = localStorage.getItem('auth_token');
        return `Bearer ${token}`;
  }
   private handleError(err){
                        let errMessage:string;

                        if(err instanceof Response){
                            let body= err.json()||'';
                            let error = body.error || JSON.stringify(body);
                            errMessage = `${error.statusText || '' } ${error}`
                        }else{
                            errMessage=err.message?err.message:err.toString();

                        }
                        return Observable.throw(errMessage);
    }
  
}
