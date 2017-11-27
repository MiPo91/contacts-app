import {Injectable} from '@angular/core';
import {Contact} from '../contact';
import * as _ from 'lodash';
import {HttpContactService} from './http-contact.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {

  private contacts: Contact[];
  // private id: number;

  constructor(private httpService: HttpContactService) {
    this.contacts = null;

    const contactByMaxId = _.maxBy(this.contacts, 'id');
    // this.id = contactByMaxId ? contactByMaxId.id : 0;
  }

  findContacts(): Observable<Contact[]> {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));

    if (this.contacts === null) {
      /*      this.contacts = [
              new Contact(1, 'Testi', 'Henkilo', '040123456', 'Testikuja 12', 'Lappeenranta')
            ];*/

      return this.httpService.getContacts().map(result => {
        this.contacts = result;
        this.saveToLocalStorage();
        return result;
      });
    }
    return Observable.of(this.contacts);
  }

  findContactById(id) {
    const contact = _.find(this.contacts, function (c) {
      return c.id === id;
    });
    return contact;
  }

  saveContact(contact: Contact) {
    if (contact.id) { // Edit contact
      this.httpService.updateContact(contact).subscribe(result => {
        const index = _.findIndex(this.contacts, {id: contact.id});
        this.contacts.splice(index, 1, contact);

        this.saveToLocalStorage();
      });
    } else { // New contact
      // this.id += 1;
      // contact.id = this.id;

      this.httpService.saveContact(contact).subscribe(result => {
        contact.id = result.id;
        this.contacts.push(Object.assign({}, contact));

        this.saveToLocalStorage();
      });
    }
  }

  deleteContact(contact: Contact) {
    _.remove(this.contacts, function (c) {
      return c.id === contact.id;
    });
    this.httpService.deleteContact(contact).subscribe();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
