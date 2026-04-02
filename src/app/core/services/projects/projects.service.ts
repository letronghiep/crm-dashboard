import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';
import { ProjectWithAssignee } from '../../models/project';
import { Observable } from 'rxjs';
import { API_CONSTANT } from '../../consts/CONSTANT';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends CustomHttpService {
  baseUrl = environment.BASE_URL;

  getProjects(): Observable<{
    message: string;
    contents: ProjectWithAssignee[];
  }> {
    return this.get(`${API_CONSTANT.projects}`);
  }
  getDetailProject(id: string): Observable<{
    message: string;
    data: ProjectWithAssignee;
  }> {
    return this.get(`${API_CONSTANT.projects}/${id}`);
  }
}
