import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ToolbarService, ToolbarSettings} from '../../toolbar/toolbar.service';
import {Location} from '@angular/common';
import {HttpContactService} from '../services/http-contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;
  editMode: boolean;

  constructor(private httpService: HttpContactService, private router: Router, private route: ActivatedRoute, private toolbar: ToolbarService, private location: Location) {
    this.contact = new Contact();
    this.editMode = false;
  }

  onSubmitContact() {
    // this.contactService.saveContact(this.contact);
    this.httpService.saveContact(this.contact).subscribe(result => {
      console.log(result);
    });
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  ngOnInit() {
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Contact Details', true));

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // this.contact = this.contactService.findContactById(+id);
      this.httpService.getContactById(+id).subscribe(result => {
        this.contact = result;
      });
      this.editMode = true;
    }
  }
}
