import {Injectable} from '@angular/core';
import {Contact} from '../contact';
import * as _ from 'lodash';

@Injectable()
export class ContactService {

  private contacts: Contact[];
  private id: number;

  constructor() {
    this.contacts = this.findContacts();

    const testi = _.maxBy(this.contacts, function (c) {
      return c.id;
    });
    if (typeof testi !== 'undefined') {
      this.id = testi.id;
    } else {
      this.id = 0;
    }
  }

  findContacts() {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));

    if (this.contacts === null) {
      this.contacts = [
        new Contact(1, 'Testi', 'Henkilo', '040123456', 'Testikuja 12', 'Lappeenranta')
      ];
      this.saveToLocalStorage();
    }

    return this.contacts;
  }

  findContactById(id) {
    console.log(this.contacts);
     return _.find(this.contacts, function(c) { return c.id === id ; });
  }

  saveContact(contact: Contact) {
    this.id += 1;
    contact.id = this.id;
    this.contacts.push(Object.assign({}, contact));

    this.saveToLocalStorage();
  }

  deleteContact(contact: Contact) {
    _.remove(this.contacts, function (c) {
      return c.id === contact.id;
    });
    this.saveToLocalStorage();
  }

  saveEditContact(contact: Contact) {
    const index = _.findIndex(this.contacts, {id: contact.id});
    this.contacts.splice(index, 1, contact);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
