import {Component, OnInit} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Contact} from '../contact';
import {Router} from '@angular/router';
import {ToolbarService, ToolbarSettings} from '../../toolbar/toolbar.service';
import {HttpContactService} from '../services/http-contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[];

  constructor(private httpService: HttpContactService, private router: Router, private toolbar: ToolbarService) {
    this.contacts = [];
  }

  ngOnInit() {
    // this.contacts = this.contactService.findContacts();
    this.httpService.getContacts().subscribe( result => {
      this.contacts = result;
    });
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Contacts'));
  }

  onSubmitNewContact() {
    this.router.navigate(['/add-contact']);
  }
}
