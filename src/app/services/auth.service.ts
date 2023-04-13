import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {GlobalVariable} from '../shared/global';
import { throwError,BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private userSubject = new BehaviorSubject<any>(null);

  login(loginData: any){    
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/auth/login', loginData)
    .pipe(catchError(this.serverError), tap(resData => {
      if (resData.status === true){
          const user = {
            id: resData.data.id,
            firstName: resData.data.first_name,
            lastName: resData.data.last_name,
            email: resData.data.email,
            userTypeId: resData.data.user_type_id,
            isLoggedin: true
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user)
      }else{
        console.log('error')
      }
    })); 
  }


  registration(registrationData: any){
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/auth/register', registrationData)
    .pipe(catchError(this.serverError), tap(resData => {
      if (resData.status === true){
        const user = {
          id: resData.data.id,
          firstName: resData.data.first_name,
          lastName: resData.data.last_name,
          email: resData.data.email,
          userTypeId: resData.data.user_type_id,
          isLoggedin: true
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user)
      }else{
        console.log('error')
      }
    })); 
  }

  logOut(){
    this.userSubject.next(null);
    localStorage.removeItem('user');
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

  getLoggedinUser(){

      const myJsonString = localStorage.getItem('user');

      // Convert the JSON string back to an object
      if(myJsonString !== null){
        const userData = JSON.parse(myJsonString);
        this.userSubject.next(userData)
      }
  }

  getLoggedinUserListener(){
    return this.userSubject.asObservable();
  }
}
