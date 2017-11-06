import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../contact';
import {ContactService} from '../../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmitDelete() {
    this.contactService.deleteContact(this.contact);
  }

  onSubmitEdit() {
    this.router.navigate(['/contacts', this.contact.id]);
  }
}
