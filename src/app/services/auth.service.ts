import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {GlobalVariable} from '../shared/global';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: any){    
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/auth/login', loginData)
    .pipe(catchError(this.serverError), tap(resData => {
      if (resData.status === true){

      }else{
        console.log('error')
      }
    })); 
  }


  registration(registrationData: any){    
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/auth/register', registrationData)
    .pipe(catchError(this.serverError), tap(resData => {
      if (resData.status === true){

      }else{
        console.log('error')
      }
    })); 
  }


  private serverError(err: any) {
    // console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return throwError('backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Your are not authorised', statusText: err.statusText});
    }
    return throwError(err);
  }
}
