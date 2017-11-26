import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../contact';
import {ContactService} from '../../services/contact.service';
import {Router} from '@angular/router';
import {HttpContactService} from '../../services/http-contact.service';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private httpService: HttpContactService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmitDelete() {
    // this.contactService.deleteContact(this.contact);
    this.httpService.deleteContact(this.contact).subscribe(result => {
      console.log(result);
    });
  }

  onSubmitEdit() {
    this.router.navigate(['/contacts', this.contact.id]);
  }

  navigateToMap() {
    this.router.navigate(['map',
      {
        streetAddress: this.contact.streetAddress,
        city: this.contact.city
      }
    ]);
  }
}
