import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/core/models/event.interface';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  eventTypes = [
    { label: 'Meeting', value: 'MEETING', color: '#3b82f6' },
    { label: 'Call', value: 'CALL', color: '#10b981' },
    { label: 'Demo', value: 'DEMO', color: '#8b5cf6' },
    { label: 'Webinar', value: 'WEBINAR', color: '#06b6d4' },
    { label: 'Task', value: 'TASK', color: '#f59e0b' }
  ];

  statusOptions = [
    { label: 'Scheduled', value: 'SCHEDULED' },
    { label: 'Ongoing', value: 'ONGOING' },
    { label: 'Done', value: 'DONE' },
    { label: 'Cancelled', value: 'CANCELLED' }
  ];

  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' }
  ];

  companies: any[] = [];
  contacts: any[] = [];
  deals: any[] = [];
  projects: any[] = [];
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private translate: TranslateService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      allDay: [false],
      location: [''],
      meetingUrl: [''],
      type: ['MEETING', [Validators.required]],
      status: ['SCHEDULED', [Validators.required]],
      priority: ['MEDIUM'],
      assignedTo: [null],
      companyId: [null],
      contactIds: [[]],
      dealId: [null],
      projectId: [null],
      tags: [[]]
    });
  }

  ngOnInit(): void {
    const data = this.dialogConfig.data;
    
    this.companies = data?.companies ?? [];
    this.contacts = data?.contacts ?? [];
    this.deals = data?.deals ?? [];
    this.projects = data?.projects ?? [];
    this.employees = data?.employees ?? [];

    if (data?.date) {
      const startDate = new Date(data.date);
      const endDate = new Date(data.date);
      endDate.setHours(endDate.getHours() + 1);
      
      this.eventForm.patchValue({
        startTime: startDate,
        endTime: endDate
      });
    }

    if (data?.event) {
      this.eventForm.patchValue(data.event);
    }
  }

  onSave(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const selectedType = this.eventTypes.find(t => t.value === formValue.type);
      
      const eventData = {
        ...formValue,
        color: selectedType?.color || '#3b82f6'
      };

      this.dialogRef.close(eventData);
    } else {
      Object.keys(this.eventForm.controls).forEach(key => {
        this.eventForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAllDayChange(): void {
    const allDay = this.eventForm.get('allDay')?.value;
    if (allDay) {
      const startTime = this.eventForm.get('startTime')?.value;
      if (startTime) {
        const start = new Date(startTime);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setHours(23, 59, 59, 999);
        
        this.eventForm.patchValue({
          startTime: start,
          endTime: end
        });
      }
    }
  }
}
