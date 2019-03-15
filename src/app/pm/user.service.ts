import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable()
export class UserService {

  constructor(protected http: HttpClient) {}

    buildAPIUrl(uri: string, id?: any) {
      const newUrl = `${environment.server}:${environment.port}/${environment.api}/${environment.version}` + uri;
      return newUrl + (typeof id !== 'undefined' ? '/' + id : '');
    }

    getHeaders() {
      const headers =  new HttpHeaders({'Content-Type': 'application/json'});
      return headers;
    }

    list() {
      const headers = this.getHeaders();
      const url = this.buildAPIUrl('/user')
      return this.http.get(url, { headers: headers }).pipe(
        map((response: Array<User>) => {
          return response;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //  A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err);
          } else {
            console.log(err);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
          }
          return observableThrowError(err.error);
        })
      );
    }

    retrieve(id?: number) {
      const headers = this.getHeaders();
      const url = this.buildAPIUrl('/user', id);
      return this.http.get(url, { headers: headers }).pipe(
        map((response: JSON) => {
          return response;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //  A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err);
          } else {
            console.log(err);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
          }
          return observableThrowError(err.error);
        })
      );
    }

    create(user: User) {
      const body = JSON.stringify(user);
      const headers = this.getHeaders();
      const url = this.buildAPIUrl('/user')
      return this.http.post(url, body, {headers: headers}).pipe(
        map((response: User) => {
          return response;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //  A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err);
          } else {
            console.log(err);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
          }
          return observableThrowError(err.error);
        })
      );
    }

    update(user: User) {
      const body = JSON.stringify(user);
      const headers = this.getHeaders();
      const url = this.buildAPIUrl('/user', user.id);
      return this.http.put(url, body, {headers: headers}).pipe(
        map((response: User) => {
          return response;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //  A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err);
          } else {
            console.log(err);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
          }
          return observableThrowError(err.error);
        })
      );
    }

    destroy(user: User) {
      const headers = this.getHeaders();
      const url = this.buildAPIUrl('/user', user.id);
      return this.http.delete(url, {headers: headers}).pipe(
        map((response: User) => {
          return response;
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //  A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err);
          } else {
            console.log(err);
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
          }
          return observableThrowError(err.error);
        })
      );
    }
}