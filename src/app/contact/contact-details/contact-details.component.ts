import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;
  title: string;
  actionType: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
    this.contact = new Contact();
    this.title = 'Add new Contact';
    this.actionType = 'new';
  }

  onSubmitContact() {
    this.contactService.saveContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  onSubmitEditContact() {
    this.contactService.saveEditContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contact = this.contactService.findContactById(+id);
      this.title = 'Edit Contact - ' + id;
      this.actionType = 'update';
    }
  }
}
