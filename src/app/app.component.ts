import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router) {
    this.title = 'contacts-app';
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

}
