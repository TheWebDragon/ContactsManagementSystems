import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environments';

@Injectable({ 
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Contact`;

  constructor() {}

  GetAllContactDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  CreateContactDetails(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }

  DeleteContactDetails(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
