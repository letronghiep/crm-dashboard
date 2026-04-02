import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { ProjectWithAssignee } from 'src/app/core/models/project';
import { Task } from 'src/app/core/models/task';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { ThemeService } from 'src/app/layouts/theme.service';
import { ProjectBaseComponent } from './project-base.component';
import { AddProjectComponent } from './single-project/add-project/add-project.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CompaniesService } from 'src/app/core/services/companies/companies.service';
import { Employee } from 'src/app/core/models/employee';
import { Company } from 'src/app/core/models/company.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [MessageService, DialogService],
})
export class ProjectsComponent
  extends ProjectBaseComponent
  implements OnInit, DoCheck
{
  selectedProject: ProjectWithAssignee | null = null;
  showDetail = false;
  isShowDetail = false;
  isViewTaskDetail = false;
  filterStatus = 'todo';
  companies: Company[] = [];

  private projectSubject = new BehaviorSubject<ProjectWithAssignee[]>([]);
  projects$: Observable<ProjectWithAssignee[]>;

  constructor(
    fb: FormBuilder,
    themeService: ThemeService,
    private projectService: ProjectsService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router,
    private dialogService: DialogService,
    private companiesService: CompaniesService,
  ) {
    super(fb, themeService);
    this.projects$ = this.projectSubject.asObservable();
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res) => {
      res.contents.forEach((e) => this.employeeMap.set(e.id, e));
    });
    this.companiesService.getCompanies().subscribe((res) => {
      this.companies = res.contents;
    });

    this.projects$ = this.projectService.getProjects().pipe(
      takeUntil(this.destroy$),
      map((res) => res.contents),
      tap((projects) => {
        if (projects?.[0]) this.selectProject(projects[0]);
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to load projects',
          detail: err.message,
        });
        return of([]);
      }),
    );
  }

  ngDoCheck(): void {
    if (this.selectedProject && this.isEditing) {
      this.userInProject = this.selectedProject.userInProject || [];
    }
  }

  selectProject(project: ProjectWithAssignee): void {
    this.selectedProject = project;
    this.selectedTask = null;
    this.showDetail = false;
    this.assigneeSlots = [...(project.assignees ?? [])];
    this.assigneesArray.clear();
    (project.assignees ?? []).forEach((id) =>
      this.assigneesArray.push(new FormControl(id)),
    );
    this.rebuildOptions(project);
  }

  get allTimelineTasks() {
    if (!this.selectedProject) return [];
    return [
      ...this.selectedProject.activeTasks,
      ...this.selectedProject.backlogTasks,
    ];
  }

  getTasksByStatus(status: string, backlog = false) {
    if (!this.selectedProject) return [];
    const tasks = backlog
      ? this.selectedProject.backlogTasks
      : this.selectedProject.activeTasks;
    return tasks?.filter((t) => t.status === status) ?? [];
  }

  onDrop(targetStatus: string, isBacklog: boolean): void {
    if (!this.draggingTask || !this.selectedProject) return;
    const sourceList = this.draggingFromBacklog
      ? this.selectedProject.backlogTasks
      : this.selectedProject.activeTasks;
    const idx = sourceList.findIndex((t) => t.id === this.draggingTask.id);
    if (idx > -1) sourceList.splice(idx, 1);
    const targetList = isBacklog
      ? this.selectedProject.backlogTasks
      : this.selectedProject.activeTasks;
    targetList.push({ ...this.draggingTask, status: targetStatus as any });
    this.draggingTask = null;
    this.isDragging = false;
  }

  getAssignee(project: ProjectWithAssignee | null, id?: number): string {
    return id ? (this.employeeMap.get(id)?.name ?? '') : '';
  }
  redirectToTask(task: Task) {
    this.router.navigate(['/projects/1'], {
      state: {
        task: task,
      },
    });
  }
  addProject() {
    this.dialogService.open(AddProjectComponent, {
      header: 'Add Project',
      width: '60%',
      data: {
        // employees: this.employees,
        companies: this.companies,
      },
    });
  }
  
}
