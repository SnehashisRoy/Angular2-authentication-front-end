import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private service:AuthService,
              private router: Router
  ){}

  ngOnInit(){
      
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }
  get loggedIn(){
    return this.service.loggInStatus();
  }
}
