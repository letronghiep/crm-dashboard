import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { Contact, ContactWithOwner } from '../../models/contact.interface';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService extends CustomHttpService {

  getContacts(): Observable<{ message: string; contents: Contact[] }> {
    return this.get<{ message: string; contents: Contact[] }>(API_CONSTANT.contacts);
  }

  getContactsWithOwner(): Observable<ContactWithOwner[]> {
    return this.get<{ message: string; contents: ContactWithOwner[] }>(API_CONSTANT.contacts)
      .pipe(map(res => res.contents));
  }
}
