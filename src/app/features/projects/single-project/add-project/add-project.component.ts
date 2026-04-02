import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadedFile } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit, DoCheck {
  projectForm: FormGroup = new FormGroup({});

  statusOptions = [
    { label: 'Planning', value: 'planning' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'On Hold', value: 'on_hold' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  tags = [
    { name: 'Frontend', code: 'frontend' },
    { name: 'Backend', code: 'backend' },
    { name: 'Mobile', code: 'mobile' },
    { name: 'Design', code: 'design' },
  ];

  employees: any[] = [];
  companies: any[] = [];

  // Array for upload-file component
  avatarAttachments: UploadedFile[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
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
      avatar: [''],
      description: [''],
      status: ['planning', [Validators.required]],
      companyId: [null],
      priority: ['medium', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      budget: [null],
      managerId: [null, [Validators.required]],
      userInProject: [[]],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    const data = this.dialogConfig.data;

    this.employees = data?.employees ?? [];
    this.companies = data?.companies ?? [];

    if (data?.id) {
      this.projectForm.patchValue(data);
      if (data.avatar) {
        this.avatarAttachments = [
          {
            name: 'avatar',
            serverPath: data.avatar,
            type: 'image',
            size: 0,
          },
        ];
      }
    }
  }

  ngDoCheck(): void {
    if (this.avatarAttachments.length === 0) return;
    const path = this.avatarAttachments[0].serverPath;
    if (this.projectForm.get('avatar')?.value !== path) {
      this.projectForm.get('avatar')?.setValue(path, { emitEvent: false });
    }
  }

  onSave() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this.dialogRef.close(this.projectForm.value);
    } else {
      Object.keys(this.projectForm.controls).forEach((key) => {
        this.projectForm.get(key)?.markAsTouched();
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
