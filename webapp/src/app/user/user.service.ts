import {Injectable, OnInit} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';

@Injectable()
export class UserService implements OnInit {
  public users: User[];
  public user: User;
  public loggedIn: boolean;

  constructor(private router: Router) {
    this.users = [
      new User('username', 'password', 'MiPo91'),
      new User('test', 'test', 'Joku Jostain')
    ];
  }

  ngOnInit() {
  }

  login(user: User) {
    const authenticatedUser = this.users.find(u => u.account === user.account);
    if (authenticatedUser && authenticatedUser.password === user.password) {
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      this.loggedIn = true;
      this.router.navigate(['']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this.loggedIn = false;
      // this.router.navigate(['login']);
    } else {
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  getUserInfo() {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      return this.user;
    } else {
      return null;
    }
  }

}
