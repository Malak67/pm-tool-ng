import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastaModule } from 'ngx-toasta';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';

import { PMService } from '../pm/pm.service';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastaModule
  ],
  providers: [
    PMService
  ]
})
export class AuthModule { }
