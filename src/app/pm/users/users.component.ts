import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.list()
    .subscribe(
      res => {
        if (res) {
          this.users = res;
        }
      },
      error => console.log(error)
      );
  }

}
