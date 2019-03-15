import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService} from '../user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  user: any;
  updating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
       username: ['', Validators.required ],
       email: ['', Validators.required ],
       fname: ['', Validators.required ],
       lname: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.userService.retrieve(this.userId)
      .subscribe(
        data => {
          if (data) {
            this.user = data;
          }
        },
        error => {
          console.log(error);
        });
    });
  }

  onSubmit() {
    const user = this.userForm.value as User;
    user.id = this.user.id;

    this.userService.update(user)
      .subscribe(
        data => {
          if (data) {
            this.user = data;
            this.toggleUpdate();
          }
        },
        error => console.log(error)
      );
  }

  reset() {
    this.userForm.reset();
  }

  toggleUpdate() {
    this.updating = !this.updating;
    this.userForm.patchValue({
      username: this.user.username,
      fname: this.user.fname,
      lname: this.user.lname,
      email: this.user.email,
    });
  }

}
