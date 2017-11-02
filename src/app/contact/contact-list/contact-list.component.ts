import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[];
  contact: Contact;

  constructor(private contactService: ContactService) {
    this.contacts = [];
    this.contact = new Contact();
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }

  onSubmitContact() {
    this.contactService.saveContact(this.contact);
  }
}
