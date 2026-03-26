import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { environment } from 'src/environments/environment';
import { IAdminData } from '../../models/data.interface';
import { Event } from '../../models/event.interface';
import { Company } from '../../models/company.interface';
@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.BASE_URL;
  getCompanies(): Observable<{
    message: string;
    contents: Company[];
  }> {
    return this.http.get<{
      message: string;
      contents: Company[];
    }>(`${this.baseUrl}/${API_CONSTANT.companies}`);
  }
}
