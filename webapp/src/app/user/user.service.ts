import {Injectable, OnInit} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService implements OnInit {
  public user: User;
  public loggedIn: boolean;
  public url: string;

  constructor(private router: Router, private http: HttpClient) {
    this.url = environment.endpointUrl;
  }

  ngOnInit() {
  }

  getContactByAccount(account: string): Observable<User> {
    return this.http.get<User>(this.url + '/user/' + account);
  }

  login(user: User) {
    return this.getContactByAccount(user.account).map(result => {
      if (result && result.password === user.password) {
        localStorage.setItem('user', JSON.stringify(result));
        this.loggedIn = true;
        this.router.navigate(['']);
        return true;
      }
      return false;
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