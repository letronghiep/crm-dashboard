import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { environment } from 'src/environments/environment';
import { IAdminData } from '../../models/data.interface';
import { Event } from '../../models/event.interface';
@Injectable({
  providedIn: 'root',
})
export class DashboardAdminService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.BASE_URL;
  dashboardOverview(): Observable<{
    message: string;
    contents: {
      workload: IAdminData['workload'];
      projects: IAdminData['projects'];
    };
  }> {
    return this.http.get<{
      message: string;
      contents: {
        workload: IAdminData['workload'];
        projects: IAdminData['projects'];
      };
    }>(`${this.baseUrl}/${API_CONSTANT.dashboardOverview}`);
  }

  // Event
  getNearestEvent(): Observable<{
    message: string;
    contents: Event[];
  }> {
    return this.http.get<{
      message: string;
      contents: Event[];
    }>(`${this.baseUrl}/${API_CONSTANT.nearestEvent}`);
  }
  getNearestEventItem(id: string): Observable<{
    message: string;
    data: Event;
  }> {
    return this.http.get<{
      message: string;
      data: Event;
    }>(`${this.baseUrl}/${API_CONSTANT.nearestEvent}/${id}`);
  }
}
