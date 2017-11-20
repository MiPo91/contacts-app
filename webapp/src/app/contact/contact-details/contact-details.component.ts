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
  editMode: boolean;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute, private toolbar: ToolbarService, private location: Location) {
    this.contact = new Contact();
    this.editMode = false;
  }

  onSubmitContact() {
    this.contactService.saveContact(this.contact);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  ngOnInit() {
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Contact Details', true));

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.contact = this.contactService.findContactById(+id);
      this.editMode = true;
    }
  }
}
