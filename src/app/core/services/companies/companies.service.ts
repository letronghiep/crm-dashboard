import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { Company } from '../../models/company.interface';
import { CustomHttpService } from '../custom-http.service';
@Injectable({
  providedIn: 'root',
})
export class CompaniesService extends CustomHttpService{
  getCompanies(): Observable<{
    message: string;
    contents: Company[];
  }> {
    return this.get<{
      message: string;
      contents: Company[];
    }>(API_CONSTANT.companies);
  }
}
