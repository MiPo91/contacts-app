import {Injectable, OnInit} from '@angular/core';
import {User} from './user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Token} from './token';

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

  getAuthToken(user: User) {
    return this.http.post<Token>(this.url + '/authentication', user);
  }

  login(user: User) {
    return this.getAuthToken(user).map(result => {
      if (result !== null) {
        localStorage.setItem('authToken', JSON.stringify(result));
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn = true;
        this.router.navigate(['/ca']);
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  checkCredentials() {
    if (localStorage.getItem('authToken') === null) {
      this.loggedIn = false;
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
