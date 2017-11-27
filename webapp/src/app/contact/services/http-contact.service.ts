import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contact';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpContactService {

  constructor(private http: HttpClient) {
  }


  getContactById(contactId: number): Observable<Contact> {
   return this.http.get<Contact>('http://localhost:59099/api/contacts/' + contactId);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:59099/api/contacts');
  }

  saveContact(contact: Contact) {
    return this.http.post<Contact>('http://localhost:59099/api/contacts', contact);
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>('http://localhost:59099/api/contacts/2', contact);
  }

  deleteContact(contact: Contact) {
    return this.http.delete('http://localhost:59099/api/contacts/' + contact.id);
  }
}
