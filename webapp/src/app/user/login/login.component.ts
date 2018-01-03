import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {ToolbarService, ToolbarSettings} from '../../toolbar/toolbar.service';
import {DialogsService} from '../../dialogs/dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public errorMessage: string;

  constructor(private userService: UserService, private toolbar: ToolbarService, private dialogs: DialogsService) {
    this.user = new User(0, '', '', '');
    this.errorMessage = '';
  }

  ngOnInit() {
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Login'));
  }

  login() {
    this.userService.login(this.user).map(res => res).subscribe(
      data => data,
      err => this.dialogs.confirm(err.title, err.message)
    );
  }
}
