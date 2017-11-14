import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ToolbarService, ToolbarSettings} from '../../toolbar/toolbar.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;
  title: string;
  actionType: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute, private toolbar: ToolbarService, private location: Location) {
    this.contact = new Contact();
    this.title = 'Add new Contact';
    this.actionType = 'new';
  }

  onSubmitContact() {
    this.contactService.saveContact(this.contact);
    this.router.navigate(['/']);
  }

  onSubmitEditContact() {
    this.contactService.saveEditContact(this.contact);
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Contact Details', true));

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contact = this.contactService.findContactById(+id);
      this.title = 'Edit Contact - ' + id;
      this.actionType = 'update';
    }
  }
}
