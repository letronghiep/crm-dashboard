import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { environment } from 'src/environments/environment';
import { IAdminData } from '../../models/data.interface';
import { Event } from '../../models/event.interface';
import { CustomHttpService } from '../custom-http.service';
@Injectable({
  providedIn: 'root',
})
export class DashboardAdminService extends CustomHttpService {
  dashboardOverview(): Observable<{
    message: string;
    contents: {
      workload: IAdminData['workload'];
      projects: IAdminData['projects'];
    };
  }> {
    return this.get<{
      message: string;
      contents: {
        workload: IAdminData['workload'];
        projects: IAdminData['projects'];
      };
    }>(API_CONSTANT.dashboardOverview);
  }

  // Event
  getNearestEvent(): Observable<{
    message: string;
    contents: Event[];
  }> {
    return this.get<{
      message: string;
      contents: Event[];
    }>(API_CONSTANT.nearestEvent);
  }
  getNearestEventItem(id: string): Observable<{
    message: string;
    data: Event;
  }> {
    return this.get<{
      message: string;
      data: Event;
    }>(`${API_CONSTANT.nearestEvent}/${id}`);
  }
}
