import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Employee } from 'src/app/core/models/employee';
import { Task } from 'src/app/core/models/task';
import { ReportTimeComponent } from './report-time/report-time.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [DialogService],
})
export class TaskDetailComponent implements OnInit, OnChanges {
  @Input() task?: Task | null;
  @Input() employeeMap: Map<number, Employee> = new Map();
  @Input() projectNumber?: string;
  @Input() deadline?: Date;
  @Input() reporter?: number;
  @Output() backToTaskList = new EventEmitter<Task | null>();
  isEditing = false;
  taskForm: FormGroup;

  statusOptions = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Done', value: 'done' },
  ];

  priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  recentActivities = [
    {
      action: 'Updated the status of',
      target: 'Mind Map',
      suffix: 'task to',
      highlight: 'In Progress',
      icon: 'pi-comment',
      iconClass: 'text-blue-400',
    },
    {
      action: 'Attached files to',
      target: 'Mind Map',
      suffix: 'task',
      highlight: '',
      icon: 'pi-paperclip',
      iconClass: 'text-purple-400',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private ref: DialogService,
  ) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      status: [''],
      priority: [''],
      assignee: [null],
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      status: [''],
      priority: [''],
      assignee: [null],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        status: this.task.status,
        priority: this.task.priority,
        assignee: this.task.assignee ?? null,
      });
    }
  }

  get allEmployees(): Employee[] {
    return Array.from(this.employeeMap.values());
  }
  get reporterName(): string | undefined {
    if (!this.reporter) return '';
    return this.employeeMap.get(this.reporter)?.name;
  }

  get titleCtrl() {
    return this.taskForm.get('title') as FormControl;
  }
  get descriptionCtrl() {
    return this.taskForm.get('description') as FormControl;
  }
  get assigneeCtrl() {
    return this.taskForm.get('assignee') as FormControl;
  }

  getEmployee(id?: number): Employee | undefined {
    return id ? this.employeeMap.get(id) : undefined;
  }

  priorityClass(priority: string): string {
    return (
      (
        {
          high: 'text-red-500',
          medium: 'text-amber-500',
          low: 'text-green-500',
        } as any
      )[priority] || ''
    );
  }

  priorityIcon(priority: string): string {
    return priority === 'low' ? 'pi-arrow-down' : 'pi-arrow-up';
  }

  formatHours(hours?: number): string {
    if (!hours) return '0h';
    const d = Math.floor(hours / 8);
    const h = hours % 8;
    return d > 0 ? (h > 0 ? `${d}d ${h}h` : `${d}d`) : `${h}h`;
  }

  onSave(): void {
    if (this.task) Object.assign(this.task, this.taskForm.value);
    this.isEditing = false;
  }
  clearTask(task: Task) {
    if (this.isEditing) {
      this.isEditing = false;
    } else {
      this.backToTaskList.emit(task);
    }
  }
  onLogTime(task: Task) {
    this.ref
      .open(ReportTimeComponent, {
        header: 'Log Time',
        width: '25%',
        data: {
          task: task,
          employeeMap: this.employeeMap,
        },
        styleClass: 'dialog-report-time',
      })
      .onClose.subscribe((result) => {
        if (result) {
          // this.task?.spentTime = result.timeSpent;
          // this.task?.description = result.description;
          // this.task?.logDate = result.logDate;
          // this.task?.userId = result.userId;
        }
      });
  }
}
