import { HttpClient } from '@angular/common/http';
import { Usernew } from './../models/usernew';
import { User } from './../models/user';
import {Headers,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class UserService{

    
    private url:string = 'http://RestAuth.app/api/users/';

    //Observable source
    private userCreatedSource = new Subject<User>();
    private userDeletedSource = new Subject();

    // Observable stream
    userCreated$= this.userCreatedSource.asObservable();
    userDeleted$= this.userDeletedSource.asObservable();

    constructor(private http: HttpClient){}
    

    getUsers():Observable<User[]>{
        // attaching a token
        // let headers = new Headers();
        // let token   = localStorage.getItem('auth_token');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', `Bearer ${token}`);
        return this.http.get(this.url/*,{headers}*/)
                        .map( res => res['data'])
                        .catch(this.handleError);
    }
    getUser(id:number):Observable<User>{
        return this.http.get(this.url+id)
                        .map(res => res['data'])
                        .catch(this.handleError);

    }
    
    updateUser(userNew: Usernew): Observable<Usernew>{
        return this.http.put(this.url+userNew.id, userNew )
            .map(res=>res['data'])
            .catch(this.handleError);
    }
    
    createUser(userNew:Usernew):Observable<Usernew>{
        return this.http.post( this.url, userNew)
            .map(res=>res['data'])
            .do(user=>this.userCreated(user))
            .catch(this.handleError);

    }
    
    deleteUser(id:number){
        return this.http.delete(this.url+id)
            .map(res=>res['data'])
            .do(()=>this.userDeleted())
            .catch(this.handleError);

    }
    
    userCreated(user:User){
        this.userCreatedSource.next(user);
    }

    userDeleted(){
        this.userDeletedSource.next()
    }
    
    // private toUser(user){
    //     return {id :user.id,
    //             name: `${user.first_name} ${user.last_name}`,
    //             username: user.first_name,
    //             avatar: user.avatar
    //             }

    // }
    
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