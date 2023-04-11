import { Component } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import {Md5} from 'ts-md5';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private router: Router, private authService: AuthService){
    this.registrationForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      userTypeId: new FormControl(2)
    })
  }

  onSubmit(){
    // converting password to MD5
    let password = this.registrationForm.value.password
    let confirmPassword = this.registrationForm.value.confirmPassword
    if(password != confirmPassword){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: "Confirm password failed",
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }
    const md5 = new Md5();
    const passwordMd5 = md5.appendStr(password).end();
    let registrationData = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      userTypeId: this.registrationForm.value.userTypeId,
      password: passwordMd5
    }
    let response = this.authService.registration(registrationData).subscribe(
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
