import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router) {
    this.contacts = [];
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }

  onSubmitNewContact() {
    this.router.navigate(['/add-contact']);
  }
}
