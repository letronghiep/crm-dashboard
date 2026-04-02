import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { ProjectWithAssignee } from 'src/app/core/models/project';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { ThemeService } from 'src/app/layouts/theme.service';
import { ProjectBaseComponent } from '../project-base.component';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
})
export class SingleProjectComponent
  extends ProjectBaseComponent
  implements OnInit
{
  private projectSubject = new Subject<ProjectWithAssignee>();
  project$: Observable<ProjectWithAssignee>;
  project?: ProjectWithAssignee;
  // taskSelected?: Task;
  isEditingTask: boolean = false;
  constructor(
    fb: FormBuilder,
    themeService: ThemeService,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(fb, themeService);
    this.project$ = this.projectSubject.asObservable();
  }

  ngOnInit(): void {
    const task = history.state.task;
    if (task) {
      this.selectedTask = task;
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.project$ = this.projectService.getDetailProject(id).pipe(
        takeUntil(this.destroy$),
        map((res) => {
          this.project = res.data;
          this.assigneeSlots = [...(res.data.assignees ?? [])];
          this.assigneesArray.clear();
          (res.data.assignees ?? []).forEach((aid) =>
            this.assigneesArray.push(new FormControl(aid)),
          );
          this.rebuildOptions(res.data);
          // this.selectedTask = res.data.activeTasks[0];
          res.data.userInProject?.forEach((employee) =>
            this.employeeMap.set(employee.id, employee),
          );
          return res.data;
        }),
      );
    }
  }

  get allTimelineTasks() {
    if (!this.project) return [];
    return [...this.project.activeTasks, ...this.project.backlogTasks];
  }

  getTasksByStatus(status: string, backlog = false) {
    if (!this.project) return [];
    const tasks = backlog
      ? this.project.backlogTasks
      : this.project.activeTasks;
    return tasks?.filter((t) => t.status === status) ?? [];
  }

  onDrop(targetStatus: string, isBacklog: boolean): void {
    if (!this.draggingTask || !this.project) return;
    const sourceList = this.draggingFromBacklog
      ? this.project.backlogTasks
      : this.project.activeTasks;
    const idx = sourceList.findIndex((t) => t.id === this.draggingTask.id);
    if (idx > -1) sourceList.splice(idx, 1);
    const targetList = isBacklog
      ? this.project.backlogTasks
      : this.project.activeTasks;
    targetList.push({ ...this.draggingTask, status: targetStatus as any });
    this.draggingTask = null;
    this.isDragging = false;
  }
}
