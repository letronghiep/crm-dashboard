import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/core/models/project';

@Component({
  selector: 'app-workload-project',
  templateUrl: './workload-project.component.html',
  styleUrls: ['./workload-project.component.css'],
})
export class WorkloadProjectComponent {
  @Input() isDarkMode: boolean = false;
  @Input() projects$?: Observable<Project[]>;
  getClasses(priority: string) {
    switch (priority) {
      case 'low':
        return 'text-[#0AC947]';
      case 'medium':
        return 'text-[#FFBD21]';
      case 'high':
        return 'text-red-600';
      default:
        return '';
    }
  }
}
