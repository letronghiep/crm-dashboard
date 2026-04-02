import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-report-time',
  templateUrl: './report-time.component.html',
  styleUrls: ['./report-time.component.css'],
})
export class ReportTimeComponent {
  form!: FormGroup;

  task?: Task;
  users?: any[];
  workTypes: {label: string, value: string}[] = [
    {
      label: 'Study',
      value: 'study'
    },
    {
      label: 'Create',
      value: 'create'
    },
    {
      label: 'Fix bug',
      value: 'fix bug'
    },
    {
      label: 'Test',
      value: 'test'
    },
  ]

  taskTypes = [
    { name: 'Task', value: 'task' },
    { name: 'Bug', value: 'bug' },
    { name: 'Feature', value: 'feature' },
  ];
  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    this.task = this.config.data.task;
    this.users = [...this.config.data.employeeMap.values()];
    this.form = this.fb.group({
      taskType: ['task', [Validators.required]],
      date: [new Date(), [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
      userId: [null, [Validators.required]],
    });
  }

  get totalMinutes(): number {
    const { hours, minutes } = this.form.value;
    return (hours || 0) * 60 + (minutes || 0);
  }

  get isTimeValid(): boolean {
    return !!this.form.value.startTime;
  }

  get taskTypeControl() {
    return this.form.get('taskType');
  }

  get startTimeControl() {
    return this.form.get('startTime');
  }
  get endTimeControl() {
    return this.form.get('endTime');
  }

  get dateControl() {
    return this.form.get('date');
  }

  get descriptionControl() {
    return this.form.get('description');
  }

  get userIdControl() {
    return this.form.get('userId');
  }
  get totalTime() {
    const start = this.form.get('startTime')?.value;
    const end = this.form.get('endTime')?.value;

    if (!start || !end) return 0;

    const startMinutes = this.parseTime(start);
    const endMinutes = this.parseTime(end);

    return endMinutes - startMinutes; // đơn vị: phút
  }

  parseTime(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }
  get totalTimeFormatted() {
    const totalMinutes = this.totalTime;
    if (!totalMinutes) return '';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
  submit() {
    // Mark all fields as touched để hiển thị validation errors
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
    console.log(this.form.value);
    if (this.form.invalid || !this.isTimeValid) {
      return;
    }

    this.ref.close({
      taskType: this.form.value.taskType,
      startTime: this.form.value.startTime,
      description: this.form.value.description,
      logDate: this.form.value.date,
      userId: this.form.value.userId,
    });
  }
}
