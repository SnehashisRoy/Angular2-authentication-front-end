import { Router } from '@angular/router';
import { Usernew } from './../../shared/models/usernew';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

 userNew:Usernew;
 SuccessMessage: string;
 ErrorMessage: string;
  
 constructor(private service:UserService, private router: Router) { }

  ngOnInit() {
    this.userNew = {id: null , name: "" , email: "", password: "", password_confirmation:""};
    
  }
  
  createUser(){
    this.SuccessMessage= "";
    this.ErrorMessage = "";
    this.service.createUser(this.userNew)
      .subscribe(
        userNew =>{
         this.SuccessMessage="New user has been created" ;
          console.log('User created');
          this.router.navigate(['/users']);
       },
       err=>{
         this.ErrorMessage = err;
         console.log(err);
       }
       )
  
  }

}
