import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  successMessage:string = '';
  errorMessage:string = '';

  constructor(private service:UserService) { }

  ngOnInit() {
    this.service.userCreated$
    .subscribe(
      user => {
        this.successMessage= `${user.name} has been created`;
        this.clearMessages();
      });

    this.service.userDeleted$
      .subscribe(
        () => {
          this.errorMessage = `User has been deleted`;
          this.clearMessages();
      });
      
  }

  clearMessages(){
    setTimeout(
      ()=>{
        this.successMessage='';
        this.errorMessage= ''
      }, 5000
    );

    }
  }

