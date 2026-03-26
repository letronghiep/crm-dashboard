import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/core/models/employee';
import { UploadedFile } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'edit-company-component',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent implements OnInit, DoCheck {
  title = 'Add Component';
  sizes = [10, 50, 100];
  users = [];
  tags = [
    { name: 'Bogus', code: 'Bogus' },
    { name: 'Long-Term', code: 'Long-Term' },
  ];
  companyForm: FormGroup = new FormGroup({});
  selectedTags = [];

  // Array truyền vào upload-file, watch để sync vào form
  avatarAttachments: UploadedFile[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.companyForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^\S(?:.*\S)?$/),
        ],
      ],
      avatar: [''],
      industry: ['', [Validators.required]],
      size: ['', [Validators.required]],
      website: [''],
      address: ['', [Validators.required]],
      ownerId: [null, [Validators.required]],
      tags: [[]],
      totalDealsValue: [null],
      lastActivityAt: [null],
      phoneNo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const data = this.dialogConfig.data;
    this.users =
      data?.employees.map((item: Employee) => ({
        ownerId: item.id,
        ownerName: item.name,
      })) ?? [];

    if (data?.id) {
      this.title = 'Edit Company';
      this.companyForm.patchValue(data);
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

  // Chỉ sync khi avatarAttachments thực sự có file mới
  ngDoCheck(): void {
    if (this.avatarAttachments.length === 0) return;
    const path = this.avatarAttachments[0].serverPath;
    if (this.companyForm.get('avatar')?.value !== path) {
      this.companyForm.get('avatar')?.setValue(path, { emitEvent: false });
    }
  }
  onSizeInput(event: any): void {
   const value = event.value;

  this.companyForm.get('size')?.setValue(
    value !== null && value !== undefined ? Number(value) : null
  );
  }

  onSave() {
    console.log(this.companyForm.value);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
