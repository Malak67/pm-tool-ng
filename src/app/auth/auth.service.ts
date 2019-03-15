
import {
  throwError as observableThrowError,
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpClient,
HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable()
export class AuthService {

  private loggedIn = false;
  private jwtHelper = new JwtHelperService();
  private userDetails: User;
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) {
      this.loggedIn = !!localStorage.getItem('token');
    }

  auth(user: User, method) {
    const body = JSON.stringify(user);
    const headers =  new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${environment.server}:${environment.port}/${environment.api}/${environment.version}`;
    return this.http.post(url + method, body, { headers }).pipe(
      map((res: Response) => {
        if (res['token']) {
          // console.log(res['token']);
          const token = res['token'];
          this.userDetails = res['user'];
          const msg = res['message'];
          this.saveAuthData(token);
          this.loggedIn = true;
          return res;
        }
      }),
      catchError((err: Response) => {
        console.log(err);
        return observableThrowError(err['error'].error);
      }));
  }

  logout() {
    this.loggedIn = false;
    clearTimeout(this.tokenTimer);
    this.removeAuthData();
    this.router.navigateByUrl('/auth/login');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    // verify if user is logedIn
    return localStorage.getItem('token') !== null;
  }

  getUser() {
    if ( localStorage.getItem('userID') !== null &&
      localStorage.getItem('username') !== null &&
      localStorage.getItem('userFName') !== null &&
      localStorage.getItem('userLName') !== null &&
      localStorage.getItem('isAdmin') !== null &&
      localStorage.getItem('userEmail') !== null) {
      const userDetails = {
        id: localStorage.getItem('userID'),
        username: localStorage.getItem('username'),
        fname: localStorage.getItem('userFName'),
        lname: localStorage.getItem('userLName'),
        email: localStorage.getItem('userEmail'),
        isAdmin: localStorage.getItem('isAdmin'),
      };
      return userDetails;
    }
  }

  private saveAuthData(token: string) {
    const userFirstName = this.userDetails.fname;
    const userLastName = this.userDetails.lname;
    const username = this.userDetails.username;
    const userID = this.userDetails.id;
    const userEmail = this.userDetails.email;
    const isAdmin = this.userDetails.isAdmin;

    const issuedAt = this.jwtHelper.decodeToken(token).iat;
    const exp = this.jwtHelper.decodeToken(token).exp;

    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID.toString());
    localStorage.setItem('username', username);
    localStorage.setItem('userFName', userFirstName);
    localStorage.setItem('userLName', userLastName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('isAdmin', isAdmin.toString());
    localStorage.setItem('exp', exp);
    localStorage.setItem('issuedAt', issuedAt);
  }

  private removeAuthData() {
    localStorage.clear();
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('exp');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

}
