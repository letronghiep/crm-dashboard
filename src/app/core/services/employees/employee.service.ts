import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../../models/employee';
import { API_CONSTANT } from '../../consts/CONSTANT';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}
  baseUrl = environment.BASE_URL;
  getEmployees(): Observable<{
    message: string;
    contents: Employee[];
  }> {
    return this.http.get<{
      message: string;
      contents: Employee[];
    }>(`${this.baseUrl}/${API_CONSTANT.employees}`);
  }
}
