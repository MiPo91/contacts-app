import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(private router: Router) {
    this.title = 'Home';
  }

  showContacts() {
    this.router.navigate(['/contacts']);
  }
}
