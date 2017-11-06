import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  title: string;


  // contact: Contact;

  constructor(private contactService: ContactService, private router: Router) {
    this.contacts = [];
    this.title = 'Contacts';

    // this.contact = new Contact();
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();

  }

  onSubmitNewContact() {
    // this.contactService.saveContact(this.contact);
    this.router.navigate(['/add-contact']);
  }
}
