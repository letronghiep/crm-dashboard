import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { DashboardAdminService } from 'src/app/core/services/dashoard-admin/dashboard-admin.service';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';
import { ThemeService } from 'src/app/layouts/theme.service';

@Component({
  selector: 'edit-nearest-event',
  templateUrl: './edit-nearest-event.component.html',
  styleUrls: ['./edit-nearest-event.component.css'],
  providers: [DialogService],
})
export class EditNearestEventComponent implements OnInit, OnDestroy {
  eventFormItem!: FormGroup;
  destroy$ = new Subject<void>();
  themeService: ThemeService;
  title: string = '';
  assigneesTo$: Observable<{ label: string; value: number }[]>;
  ref: DynamicDialogRef | undefined;
  typeOptions = ['MEETING', 'CALL', 'DEMO', 'WEBINAR', 'TASK'];
  statusOptions = ['SCHEDULED', 'ONGOING', 'DONE', 'CANCELLED'];
  frequencyOptions = ['DAILY', 'WEEKLY', 'MONTHLY'];
  reminderTypeOptions = [
    {
      label: 'EMAIL',
      value: 'EMAIL',
    },
    {
      label: 'NOTIFICATION',
      value: 'NOTIFICATION',
    },
  ];
  reminderUnits = [
    {
      label: 'minutes',
      value: 'minutes',
    },
    {
      label: 'hours',
      value: 'hours',
    },
    {
      label: 'days',
      value: 'days',
    },
    {
      label: 'weeks',
      value: 'weeks',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dashboardAdminService: DashboardAdminService,
    private employeeService: EmployeeService,
    themeService: ThemeService,
    private dialogService: DialogService,
  ) {
    this.themeService = themeService;
    this.buildForm();
    // this.getEmployees();
    this.assigneesTo$ = this.employeeService.getEmployees().pipe(
      takeUntil(this.destroy$),
      map((data) => {
        return data.contents.map((e) => ({ label: e.name, value: e.id }));
      }),
    );
  }

  buildForm() {
    this.eventFormItem = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startTime: [null],
      endTime: [null],
      location: [''],
      meetingUrl: [''],
      type: ['MEETING'],
      status: ['SCHEDULED'],
      assignedTo: [''],
      companyId: [''],
      contactIds: [''],
      dealId: [''],
      projectId: [''],
      reminders: this.fb.array([]),
      isRecurring: [false],
      recurrenceRule: this.fb.group({
        frequency: ['WEEKLY'],
        interval: [1],
        endDate: [null],
      }),
      attachments: [[]],
      tags: [[]],
    });
  }

  get reminders(): FormArray {
    return this.eventFormItem.get('reminders') as FormArray;
  }

  addReminder() {
    const reminderGroup = this.fb.group({
      type: ['EMAIL'],
      time: [10],
      unit: ['minutes'],
    });
    this.reminders.push(reminderGroup);
  }

  removeReminder(index: number) {
    this.reminders.removeAt(index);
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'event.edit_event';
      this.dashboardAdminService
        .getNearestEventItem(id)
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => of({ message: 'FAILED', data: null })),
        )
        .subscribe((res) => {
          if (res.message === 'SUCCESS' && res.data) {
            const data = res.data;
            // Rebuild reminders FormArray
            if (data.reminders?.length) {
              data.reminders.forEach((r) =>
                this.reminders.push(
                  this.fb.group({
                    type: [r.type],
                    time: [r.time],
                    unit: [r.unit],
                  }),
                ),
              );
            }
            if (data.attachments?.length) {
              // const attachmentData =
              //   data.attachments.map((file: any) => ({
              //     name: file.name,
              //     type: file.type,
              //     serverPath: file.serverPath,
              //     size: file.size,
              //   })) || [];

              this.eventFormItem.patchValue({
                ...data,
                contactIds: data.contactIds?.join(', ') ?? '',
                // attachments: attachmentData,
              });
            }
          }
        });
    } else {
      this.title = 'event.add_event';
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/nearest-event']);
  }

  onSave(draft = false) {
    console.log('Save', draft ? 'draft' : 'event', this.eventFormItem.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
