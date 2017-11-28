import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contact';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpContactService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://mipo91-contacts-api.azurewebsites.net';
  }

  getContactById(contactId: number): Observable<Contact> {
   return this.http.get<Contact>(this.url + 'api/contacts/' + contactId);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + 'api/contacts');
  }

  saveContact(contact: Contact) {
    return this.http.post<Contact>(this.url + 'api/contacts', contact);
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>(this.url + 'api/contacts/', contact);
  }

  deleteContact(contact: Contact) {
    return this.http.delete(this.url + 'api/contacts/' + contact.id);
  }
}
