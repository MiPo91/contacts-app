import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';
import {UserService} from './user/user.service';
import {User} from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  showContacts() {
    this.router.navigate(['/']);
  }

  addContact() {
    this.router.navigate(['/add-contact']);
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  toLoginPage() {
    this.router.navigate(['login']);
  }

  userLogout() {
    this.userService.logout();
  }

  isLoggedIn() {
    return this.userService.loggedIn;
  }

  getUserInfo() {
    return this.userService.getUserInfo();
  }
}
