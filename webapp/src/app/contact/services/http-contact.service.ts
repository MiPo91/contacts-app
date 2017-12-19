import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contact';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Token} from '../../user/token';

@Injectable()
export class HttpContactService {

  url: string;
  headers: any;
  token: Token;

  constructor(private http: HttpClient) {
    this.url = environment.endpointUrl;
    this.token = JSON.parse(localStorage.getItem('authToken'));
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token.access_token});
  }

  getContactById(contactId: number): Observable<Contact> {
   return this.http.get<Contact>(this.url + '/contacts/' + contactId);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + '/contacts', {headers: this.headers});
  }

  saveContact(contact: Contact) {
    return this.http.post<Contact>(this.url + '/contacts', contact, {headers: this.headers});
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>(this.url + '/contacts/' + contact.id, contact, {headers: this.headers});
  }

  deleteContact(contact: Contact) {
    return this.http.delete(this.url + '/contacts/' + contact.id, {headers: this.headers});
  }
}
