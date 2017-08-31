import { Router } from '@angular/router';
import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[];

  constructor(private service: UserService, private router:Router) {}

  ngOnInit() {
     this.service.getUsers()
    .subscribe(users =>{
      this.users=users;
    });
  }

  deleteUser(id:number){
    this.service.deleteUser(id)
        .subscribe(user=>{
          console.log(user);
          window.location.reload();
        })
  }

}
