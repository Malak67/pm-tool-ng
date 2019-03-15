import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
    this.loginForm = this.fb.group({
       username: ['', Validators.required ],
       password: ['', Validators.required ],
    });
  }

  onSubmit() {
    const user = this.loginForm.value as User;

    this.authService.auth(user, '/login')
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/user', data['user'].id]);
          }
        },
        error => console.log(error)
      );
  }

  reset() {
    this.loginForm.reset();
  }

}
