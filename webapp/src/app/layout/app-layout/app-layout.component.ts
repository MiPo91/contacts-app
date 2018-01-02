import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../../user/user.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  smallScreenQuery = '(max-width: 599px)';
  isSmallScreen: boolean;

  constructor(private router: Router, private userService: UserService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      this.smallScreenQuery
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  showContacts() {
    this.router.navigate(['/ca/']);
  }

  addContact() {
    this.router.navigate(['/ca/add-contact']);
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
