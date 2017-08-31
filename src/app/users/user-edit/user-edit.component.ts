import { Usernew } from './../../shared/models/usernew';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userNew: Usernew;
  SuccessMessage: string = '';
  ErrorMessage: string = '';
  constructor(private service:UserService, private route:ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.service.getUser(id).subscribe(user=>{
        this.userNew = {id: user.id , name: user.name, email: user.email, password: "", password_confirmation:""};
      })
    
    }
  updateUser(){
   this.SuccessMessage = '';
   this.ErrorMessage = '';
      this.service.updateUser(this.userNew)
      .subscribe(
        userNew=>{
        this.SuccessMessage = "Updated Successfully";
        console.log(userNew); 
      },
      err=>{
        this.ErrorMessage= err;
        console.log(err);
      }
    );

  }
}
