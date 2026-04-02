import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { UploadedFile } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, DoCheck {
  taskForm: FormGroup = new FormGroup({});
  
  taskTypeOptions = [
    { label: this.translate.instant('tasks.taskType'), value: 'task' },
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' }
  ];

  statusOptions = [
    { label: this.translate.instant('tasks.status'), value: 'todo' },
    { label: this.translate.instant('tasks.status'), value: 'in_progress' },
    { label: this.translate.instant('tasks.status'), value: 'review' },
    { label: this.translate.instant('tasks.status'), value: 'done' }
  ];

  priorityOptions = [
    { label: this.translate.instant('tasks.priority'), value: 'low' },
    { label: this.translate.instant('tasks.priority'), value: 'medium' },
    { label: this.translate.instant('tasks.priority'), value: 'high' }
  ];

  tags = [
    { name: 'Bug', code: 'bug' },
    { name: 'Feature', code: 'feature' },
    { name: 'Enhancement', code: 'enhancement' },
    { name: 'Documentation', code: 'documentation' }
  ];

  employees: any[] = [];
  projects: any[] = [];
  tasks: any[] = [];

  // Array for upload-file component
  attachments: UploadedFile[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private translate: TranslateService
  ) {
    this.taskForm = this.fb.group({
      taskType: ['task', [Validators.required]],
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^\S(?:.*\S)?$/),
        ],
      ],
      description: [''],
      status: ['todo', [Validators.required]],
      priority: ['medium', [Validators.required]],
      projectId: [null, [Validators.required]],
      parentTask: [null],
      assignee: [null, [Validators.required]],
      estimateTime: [null],
      spentTime: [0],
      startDate: [null],
      endDate: [null],
      activities: [[]],
      attachments: [[]],
      isActive: [true],
      tags: [[]]
    });
  }

  ngOnInit(): void {
    const data = this.dialogConfig.data;
    
    this.employees = data?.employees ?? [];
    this.projects = data?.projects ?? [];
    this.tasks = data?.tasks ?? [];

    if (data?.id) {
      this.taskForm.patchValue(data);
      if (data.attachments) {
        this.attachments = data.attachments;
      }
    }

    // If projectId is passed, set it
    if (data?.projectId) {
      this.taskForm.patchValue({ projectId: data.projectId });
    }
  }

  ngDoCheck(): void {
    if (this.attachments.length > 0) {
      const paths = this.attachments.map(a => a.serverPath);
      if (JSON.stringify(this.taskForm.get('attachments')?.value) !== JSON.stringify(paths)) {
        this.taskForm.get('attachments')?.setValue(paths, { emitEvent: false });
      }
    }
  }

  onSave() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.dialogRef.close(this.taskForm.value);
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
