import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
       username: ['', Validators.required ],
       password: ['', Validators.required ],
       email: ['', Validators.required ],
       fname: ['', Validators.required ],
       lname: ['', Validators.required ],
    });
  }

  onSubmit() {
    const user = this.registerForm.value as User;

    this.authService.auth(user, '/register')
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['']);
          }
        },
        error => console.log(error)
      );
  }

  reset() {
    this.registerForm.reset();
  }

}
