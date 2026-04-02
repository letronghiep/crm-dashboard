import { Directive, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/core/models/employee';
import { ProjectWithAssignee } from 'src/app/core/models/project';
import { Task } from 'src/app/core/models/task';
import { ThemeService } from 'src/app/layouts/theme.service';

@Directive()
export abstract class ProjectBaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  projectForm: FormGroup;
  employeeMap = new Map<number, Employee>();
  userInProject: Employee[] = [];
  isEditing = false;
  activeIndex = 0;
  selectedTask: any = null;
  hoveredTask: any = null;
  draggingTask: any = null;
  draggingFromBacklog = false;
  isDragging = false;
  assigneeSlots: (number | null)[] = [];
  cachedOptions: (Employee & { disabled?: boolean })[][] = [];

  readonly boardColumns = [
    {
      label: 'To Do',
      status: 'todo',
      headerClass: 'border-slate-200 text-slate-600 bg-white',
    },
    {
      label: 'In Progress',
      status: 'in_progress',
      headerClass: 'border-blue-200 text-blue-600 bg-blue-50',
    },
    {
      label: 'In Review',
      status: 'review',
      headerClass: 'border-purple-200 text-purple-600 bg-purple-50',
    },
    {
      label: 'Done',
      status: 'done',
      headerClass: 'border-green-200 text-green-600 bg-green-50',
    },
  ];

  readonly priorities = [
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
  ];

  // ── Timeline ──────────────────────────────────────────
  timelineMonth = new Date();
  readonly CELL_W = 32;

  constructor(
    protected fb: FormBuilder,
    public themeService: ThemeService,
  ) {
    this.projectForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^\S(?:.*\S)?$/),
        ],
      ],
      project_number: ['', [Validators.required]],
      description: [''],
      reporter: [null, [Validators.required]],
      assignees: this.fb.array([]),
      priority: ['', [Validators.required]],
      createdAt: [null],
      deadline: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Form helpers ──────────────────────────────────────
  get assigneesArray(): FormArray {
    return this.projectForm.get('assignees') as FormArray;
  }

  getControl(index: number): FormControl {
    return this.assigneesArray.at(index) as FormControl;
  }

  protected rebuildOptions(project?: ProjectWithAssignee): void {
    this.cachedOptions = this.assigneeSlots.map((_, i) => {
      const selectedIds = this.assigneeSlots.filter(
        (id, j) => j !== i && id !== null,
      ) as number[];
      return (project?.userInProject ?? []).map((emp) => ({
        ...emp,
        disabled: selectedIds.includes(emp.id),
      }));
    });
  }

  addAssigneeSlot(project: ProjectWithAssignee): void {
    if (
      project.userInProject &&
      this.assigneeSlots.length < project.userInProject.length
    ) {
      this.assigneeSlots.push(null);
      this.assigneesArray.push(new FormControl());
      this.rebuildOptions(project);
    }
  }

  removeAssigneeSlot(index: number): void {
    this.assigneeSlots.splice(index, 1);
    this.assigneesArray.removeAt(index);
    this.rebuildOptions();
  }

  updateAssignee(index: number, value: number | null): void {
    this.assigneeSlots[index] = value;
    this.rebuildOptions();
  }

  acceptEditing(project: ProjectWithAssignee): void {
    this.isEditing = true;
    this.projectForm.patchValue({
      ...project,
      deadline: new Date(project.deadline),
      createdAt: new Date(project.createdAt),
    });
    this.projectForm.get('createdAt')?.disable();
  }

  // ── Employee helpers ──────────────────────────────────
  getEmployee(id?: number): Employee | undefined {
    return id ? this.employeeMap.get(id) : undefined;
  }

  // ── Display helpers ───────────────────────────────────
  formatHours(hours?: number): string {
    if (!hours) return '0h';
    const d = Math.floor(hours / 8);
    const h = hours % 8;
    return d > 0 ? (h > 0 ? `${d}d ${h}h` : `${d}d`) : `${h}h`;
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

  statusLabel(status: string): string {
    return (
      (
        {
          done: 'Done',
          in_progress: 'In Progress',
          in_review: 'In Review',
          todo: 'To Do',
        } as any
      )[status] || status
    );
  }

  statusClass(status: string): string {
    return (
      (
        {
          done: 'bg-green-100 text-green-600',
          in_progress: 'bg-blue-100 text-blue-600',
          in_review: 'bg-purple-100 text-purple-600',
          todo: 'bg-gray-100 text-gray-500',
        } as any
      )[status] || 'bg-gray-100 text-gray-500'
    );
  }

  // ── Drag & Drop ───────────────────────────────────────
  onDragStart(task: any, isBacklog: boolean): void {
    this.draggingTask = task;
    this.draggingFromBacklog = isBacklog;
    this.isDragging = true;
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  // ── Timeline ──────────────────────────────────────────
  get timelineDays(): number[] {
    const days = new Date(
      this.timelineMonth.getFullYear(),
      this.timelineMonth.getMonth() + 1,
      0,
    ).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  get timelineMonthLabel(): string {
    return this.timelineMonth.toLocaleString('en', {
      month: 'long',
      year: 'numeric',
    });
  }

  get todayDate(): number | null {
    const today = new Date();
    if (
      today.getFullYear() !== this.timelineMonth.getFullYear() ||
      today.getMonth() !== this.timelineMonth.getMonth()
    )
      return null;
    return today.getDate();
  }

  prevMonth(): void {
    this.timelineMonth = new Date(
      this.timelineMonth.getFullYear(),
      this.timelineMonth.getMonth() - 1,
      1,
    );
  }

  nextMonth(): void {
    this.timelineMonth = new Date(
      this.timelineMonth.getFullYear(),
      this.timelineMonth.getMonth() + 1,
      1,
    );
  }

  isCellActive(task: any, day: number): boolean {
    const start = new Date(task.createdAt);
    const durationDays = Math.max(1, Math.ceil((task.estimateTime ?? 8) / 8));
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays);
    const cellDate = new Date(
      this.timelineMonth.getFullYear(),
      this.timelineMonth.getMonth(),
      day,
    );
    return cellDate >= start && cellDate < end;
  }

  onEditTask(task: Task): void {
    this.selectedTask = task;
    this.activeIndex = 0;
  }
  clearTaskSelected() {
    this.selectedTask = null;
  }
}
