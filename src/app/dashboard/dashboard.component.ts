import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {AdminService} from '../admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    // console.log(user.id);

    // this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;

    // this.userRole$ = new Observable(subscriber => {
    //   subscriber.next(true);
    //
    //   this.products$ = this.productService.getProducts();
    //
    //   setTimeout(()=>{
    //     subscriber.next(false);
    //   }, 2000)
    // });
  }

  onLogoutClick() {
    this.authService.logout();
    this.adminService.logout();
    localStorage.setItem('currentUser', '');
  }
}
