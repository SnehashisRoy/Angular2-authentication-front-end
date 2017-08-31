import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential = {
    grant_type: 'password',
    client_id: 2,
    client_secret: '2JL7Qp4GEM7tPbwFx1JCzzcN0jdOQJvPUJbhFLgs',
    email: '',
    password: '',

  }
  errorMessage:string = '';
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
        
  }

  login(credential){
      this.service.login(this.credential)
      .subscribe(
        data=>{
          this.router.navigate(['/users'])
          console.log(data);
        },
        err =>{
          this.errorMessage= err;
          setTimeout(()=>{
            this.errorMessage= '';
          }, 4000);
          console.error(err);
        }
      )
    }
  
}
