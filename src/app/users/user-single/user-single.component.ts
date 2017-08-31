import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute,  private service:UserService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.service.getUser(id)
        .subscribe(user => {
          this.user = user;
        })
  }

}
