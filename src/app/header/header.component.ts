import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit{
    constructor(private authService: AuthService){

    }
  user: any;

  ngOnInit() {
    this.authService.getLoggedinUser();
    this.authService.getLoggedinUserListener().subscribe(data => {
      this.user = data;
    });
  }

  logOut(){
    this.authService.logOut();
  }
}
