import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmRoutingModule } from './pm-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user.service';
import { PMService } from './pm.service';
import { AuthService } from '../auth/auth.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ErrorInterceptor } from '../auth/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    UserComponent,
    UsersComponent,
    ProjectComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    PmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    PMService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class PmModule { }
