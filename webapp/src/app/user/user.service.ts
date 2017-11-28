import {Injectable, OnInit} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService implements OnInit {
  public users: User[];
  public user: User;
  public loggedIn: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.users = [
      new User(1, 'username', 'password', 'MiPo91'),
      new User(2, 'test', 'test', 'Joku Jostain')
    ];
  }

  ngOnInit() {
  }

  getContactByAccount(account: string): Observable<User> {
    return this.http.get<User>('http://localhost:59099/api/user/' + account);
  }

  login(user: User) {
    // const authenticatedUser = this.users.find(u => u.account === user.account);
    this.getContactByAccount(user.account).subscribe(result => {
      if (result && result.password === user.password) {
        localStorage.setItem('user', JSON.stringify(result));
        this.loggedIn = true;
        this.router.navigate(['']);
      }
    });
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
