import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contact';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class HttpContactService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.endpointUrl;
  }

  getContactById(contactId: number): Observable<Contact> {
   return this.http.get<Contact>(this.url + '/contacts/' + contactId);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + '/contacts');
  }

  saveContact(contact: Contact) {
    return this.http.post<Contact>(this.url + '/contacts', contact);
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>(this.url + '/contacts/' + contact.id, contact);
  }

  deleteContact(contact: Contact) {
    return this.http.delete(this.url + '/contacts/' + contact.id);
  }
}
