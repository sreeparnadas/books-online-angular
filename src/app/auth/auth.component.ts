import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Md5} from 'ts-md5';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


  onSubmit(){
    // converting password to MD5
    const md5 = new Md5();
    const passwordMd5 = md5.appendStr(this.loginForm.value.password).end();
    const emailInput = this.loginForm.value.email;
    let loginData = {email: emailInput, password: passwordMd5}
    let response = this.authService.login(loginData).subscribe(
    {
      next: (v) => {
        this.router.navigate(['/adminPanel']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: v.message,
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: (e) => {
        console.error(e)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: e.message,
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => {} 
    }
    );
  }
}
