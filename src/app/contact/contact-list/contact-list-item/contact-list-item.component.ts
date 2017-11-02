import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../contact';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  onSubmitDelete() {
    this.contactService.deleteContact(this.contact);
  }

}
